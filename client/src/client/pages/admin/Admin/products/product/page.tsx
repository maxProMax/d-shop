'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import {
    Currency,
    AdminProduct,
    AdminProductForm,
} from '@/commerce/shop/admin/types';
import { PageForm, FormContainer } from '@/client/components/admin/atoms/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import {
    createProduct,
    updateProduct,
    deleteProduct,
} from '@/commerce/shop/admin/client';
import {
    ButtonGroup,
    IActionButton,
} from '@/client/components/admin/atoms/button';
import { useNotification } from '@/client/modules/admin/notification';
import { Routes, RoutesDynamic } from '@/client/modules/router/admin/routes';
import { UploadSection } from '@/client/components/admin/molecules/form';
import { Price } from './Price';

type FormType = Omit<AdminProductForm, 'file'> & { file?: FileList };

const Title: FC<{ isEdit: boolean }> = ({ isEdit }) => {
    const t = useTranslations('admin');

    return (
        <Typography variant="h6">
            {isEdit
                ? t('page.admin.product.page.title.edit')
                : t('page.admin.product.page.title.create')}
        </Typography>
    );
};

export const ProductPage: FC<{
    product?: AdminProduct;
    currencies?: Currency[];
}> = ({ product, currencies }) => {
    const router = useRouter();
    const { enqueueSnackbar } = useNotification();
    const t = useTranslations('admin');
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<FormType>({
        defaultValues: pick(product, ['name', 'url', 'description']),
    });

    const onSubmit: SubmitHandler<FormType> = async (data) => {
        const formData = { ...data, file: data.file?.[0] };

        if (!data.url) {
            data.url = data.name.toLocaleLowerCase().split(/\s+/).join('-');
        }

        if (product?.id) {
            await updateProduct(product.id, formData);
            enqueueSnackbar(t('notifications.submit.saved'));
            router.refresh();
        } else {
            const resp = await createProduct(formData);
            enqueueSnackbar(t('notifications.submit.created'));
            router.push(RoutesDynamic.adminProductEdit(resp.data.id));
            router.refresh();
        }
    };
    const onDelete = async () => {
        if (product?.id) {
            await deleteProduct(product?.id);
            enqueueSnackbar(t('notifications.submit.deleted'));
            router.push(Routes.ADMIN_PRODUCT);
            router.refresh();
        }
    };

    const buttons: IActionButton[] = [
        {
            actionType: product ? 'edit' : 'create',
            type: 'submit',
            loading: isSubmitting,
        },
    ];

    product && buttons.push({ actionType: 'delete', action: onDelete });

    return (
        <PageWrapper>
            <FormContainer>
                <Title isEdit={Boolean(product)} />
                <PageForm onSubmit={handleSubmit(onSubmit)}>
                    {product?.id && (
                        <Typography variant="caption">
                            {t('form.text.id', { id: product.id })}
                        </Typography>
                    )}
                    <TextField
                        label={t('form.field.name.placeholder')}
                        disabled={isSubmitting}
                        required
                        {...register('name')}
                    />
                    <TextField
                        label={t('form.field.url.placeholder')}
                        disabled={isSubmitting}
                        {...register('url')}
                    />
                    <TextField
                        label={t('form.field.description.placeholder')}
                        variant="outlined"
                        rows={10}
                        multiline
                        disabled={isSubmitting}
                        {...register('description')}
                    />
                    <div>
                        {currencies?.map((c) => {
                            const price = product?.prices?.find(
                                (p) => p.currency?.id === c.id
                            );

                            return !product?.id ? null : (
                                <Price
                                    key={c.id}
                                    productId={product?.id}
                                    currency={c}
                                    defaultValues={
                                        pick(price, [
                                            'price',
                                            'discountPrice',
                                        ]) || {}
                                    }
                                />
                            );
                        })}
                    </div>
                    <UploadSection
                        src={product?.image?.path}
                        dividerLabel={t(
                            'page.admin.product.page.section.image'
                        )}
                        formProps={register('file')}
                    />
                    <Divider />
                    <ButtonGroup buttons={buttons} />
                </PageForm>
            </FormContainer>
        </PageWrapper>
    );
};
