'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Category, Product } from '@/commerce/shop/admin/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
    deleteCategory,
    createSubcategory,
    createCategory,
    updateCategory,
} from '@/commerce/shop/admin/client';
import {
    ButtonGroup,
    IActionButton,
} from '@/client/components/admin/atoms/button';
import { useNotification } from '@/client/modules/admin/notification';
import { Routes, RoutesDynamic } from '@/client/modules/router/admin/routes';
import { PageForm, FormContainer } from '@/client/components/admin/atoms/form';
import { ProductsTable } from '../components';

type PageType = 'create' | 'create-sub' | 'edit';

const Title: FC<{ type: PageType; name?: string }> = ({ type, name }) => {
    const t = useTranslations('admin');
    const messages = {
        create: t('page.admin.category.page.title.create.parent'),
        'create-sub': t('page.admin.category.page.title.create.child', {
            name,
        }),
        edit: t('page.admin.category.page.title.edit', { name }),
    };

    return <Typography variant="h6">{messages[type]}</Typography>;
};

export const CategoryPage: FC<{
    category?: Category;
    products?: Product[];
    type: PageType;
    parentCategory?: Category;
}> = ({ category, type, parentCategory, products }) => {
    const router = useRouter();
    const t = useTranslations('admin');
    const { enqueueSnackbar } = useNotification();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<Category>({ defaultValues: category ? category : {} });

    const onSubmit: SubmitHandler<Category> = async (data) => {
        let resp: { data: { id: string } } | null = null;

        switch (type) {
            case 'create':
                resp = await createCategory(data);
                enqueueSnackbar(t('notifications.submit.created'));

                break;
            case 'create-sub':
                if (parentCategory?.id) {
                    resp = await createSubcategory(parentCategory.id, data);
                    enqueueSnackbar(t('notifications.submit.created'));
                }
                break;
            case 'edit':
                if (category?.id) {
                    await updateCategory(category.id, data);
                    enqueueSnackbar(t('notifications.submit.saved'));
                    router.refresh();
                }
                break;
        }

        if (resp) {
            router.push(RoutesDynamic.adminCategoryEdit(resp.data.id));
            router.refresh();
        }
    };
    const onDelete = async () => {
        if (category?.id) {
            await deleteCategory(category?.id);
            enqueueSnackbar(t('notifications.submit.deleted'));
            router.push(Routes.ADMIN_CATEGORY);
            router.refresh();
        }
    };

    const buttons: IActionButton[] = [
        {
            actionType: category ? 'edit' : 'create',
            type: 'submit',
            loading: isSubmitting,
        },
    ];
    category && buttons.push({ actionType: 'delete', action: onDelete });

    return (
        <FormContainer>
            <Title type={type} name={parentCategory?.name || category?.name} />
            <PageForm onSubmit={handleSubmit(onSubmit)}>
                {category?.id && (
                    <Typography variant="caption">
                        {t('form.text.id', { id: category.id })}
                    </Typography>
                )}
                <TextField
                    label={t('form.field.name.placeholder')}
                    variant="outlined"
                    disabled={isSubmitting}
                    {...register('name')}
                />
                <ButtonGroup buttons={buttons} />
            </PageForm>
            <ProductsTable
                products={products}
                categoryId={category?.id}
                addedProducts={new Set(category?.products?.map((p) => p.id))}
            />
        </FormContainer>
    );
};
