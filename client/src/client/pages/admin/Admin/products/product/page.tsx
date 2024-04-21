'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { Product } from '@/commerce/shop/admin/types';
import { PageForm, FormContainer } from '@/client/components/admin/atoms/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
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

export const ProductPage: FC<{ product?: Product }> = ({ product }) => {
    const router = useRouter();
    const { enqueueSnackbar } = useNotification();
    const t = useTranslations('admin');
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<Product>({ defaultValues: product });

    const onSubmit: SubmitHandler<Product> = async (data) => {
        if (!data.url) {
            data.url = data.name.toLocaleLowerCase().split(/\s+/).join('-');
        }

        if (product?.id) {
            await updateProduct(product.id, data);
            enqueueSnackbar(t('notifications.submit.saved'));
            router.refresh();
        } else {
            const resp = await createProduct(data);
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
                        variant="outlined"
                        disabled={isSubmitting}
                        {...register('name')}
                    />
                    <TextField
                        label={t('form.field.url.placeholder')}
                        variant="outlined"
                        disabled={isSubmitting}
                        {...register('url')}
                    />
                    <ButtonGroup buttons={buttons} />
                </PageForm>
            </FormContainer>
        </PageWrapper>
    );
};
