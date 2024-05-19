'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import TextField from '@mui/material/TextField';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { AdminUser } from '@/commerce/shop/admin/types';
import {
    updateAdminUser,
    createAdminUser,
    deleteAdminUser,
} from '@/commerce/shop/admin/client';

import {
    ButtonGroup,
    IActionButton,
} from '@/client/components/admin/atoms/button';
import { useNotification } from '@/client/modules/admin/notification';
import { PageForm } from '@/client/components/admin/atoms/form';
import { Routes, RoutesDynamic } from '@/client/modules/router/admin/routes';

export const UserPage: FC<{ user?: AdminUser }> = ({ user }) => {
    const t = useTranslations('admin');
    const router = useRouter();
    const { enqueueSnackbar } = useNotification();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<AdminUser>({ defaultValues: user ? user : {} });

    const onSubmit: SubmitHandler<AdminUser> = async (data) => {
        if (user?.id) {
            await updateAdminUser(user.id, {
                firstName: data.firstName,
                lastName: data.lastName,
            });
            enqueueSnackbar(t('notifications.submit.saved'));
        } else {
            const resp = await createAdminUser(data);
            enqueueSnackbar(t('notifications.submit.created'));
            router.push(RoutesDynamic.adminUserEdit(resp.data.id));
        }
        router.refresh();
    };
    const onDelete = async () => {
        user?.id && (await deleteAdminUser(user?.id));
        enqueueSnackbar(t('notifications.submit.deleted'));
        router.push(Routes.ADMIN_SETTINGS_USERS);
        router.refresh();
    };

    const buttons: IActionButton[] = [
        {
            actionType: user ? 'edit' : 'create',
            type: 'submit',
            loading: isSubmitting,
        },
    ];

    user && buttons.push({ actionType: 'delete', action: onDelete });

    return (
        <PageWrapper>
            <PageForm onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label={t('form.field.email.placeholder')}
                    variant="outlined"
                    type="email"
                    required
                    disabled={Boolean(user?.email) || isSubmitting}
                    {...register('email')}
                />
                <TextField
                    label={t('form.field.firstName.placeholder')}
                    variant="outlined"
                    required
                    disabled={isSubmitting}
                    {...register('firstName')}
                />
                <TextField
                    label={t('form.field.lastName.placeholder')}
                    variant="outlined"
                    required
                    disabled={isSubmitting}
                    {...register('lastName')}
                />
                {!user && (
                    <TextField
                        label={t('form.field.password.placeholder')}
                        variant="outlined"
                        disabled={isSubmitting}
                        type="password"
                        required
                        {...register('password')}
                    />
                )}
                <ButtonGroup buttons={buttons} />
            </PageForm>
        </PageWrapper>
    );
};
