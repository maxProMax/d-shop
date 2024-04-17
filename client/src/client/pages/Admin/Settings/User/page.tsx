'use client';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { PageWrapper } from '@/client/components/atoms/admin/layout';
import { AdminUser } from '@/commerce/shop/admin/types';
import {
    updateAdminUser,
    createAdminUser,
    deleteAdminUser,
} from '@/commerce/shop/admin/client';

export const UserPage: FC<{ user?: AdminUser }> = ({ user }) => {
    const t = useTranslations('admin');
    const [notificationMsg, setMsg] = useState('');
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
            setMsg(t('notifications.submit.saved'));
        } else {
            await createAdminUser(data);
            setMsg(t('notifications.submit.created'));
        }
    };
    const onDelete = async () => {
        user?.id && (await deleteAdminUser(user?.id));
        setMsg(t('notifications.submit.deleted'));
    };
    const handleClose = (event: any, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setMsg('');
    };

    return (
        <PageWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <TextField
                        label={t('form.field.email.placeholder')}
                        variant="outlined"
                        type="email"
                        disabled={Boolean(user?.email) || isSubmitting}
                        {...register('email')}
                    />
                    <TextField
                        label={t('form.field.firstName.placeholder')}
                        variant="outlined"
                        disabled={isSubmitting}
                        {...register('firstName')}
                    />
                    <TextField
                        label={t('form.field.lastName.placeholder')}
                        variant="outlined"
                        disabled={isSubmitting}
                        {...register('lastName')}
                    />
                    {!user && (
                        <TextField
                            label={t('form.field.password.placeholder')}
                            variant="outlined"
                            disabled={isSubmitting}
                            // type="password"
                            {...register('password')}
                        />
                    )}
                    <ButtonGroup>
                        <LoadingButton loading={isSubmitting} type="submit">
                            {user
                                ? t('form.buttons.edit')
                                : t('form.buttons.create')}
                        </LoadingButton>
                        {user && (
                            <LoadingButton
                                onClick={onDelete}
                                loading={isSubmitting}
                                color="error"
                            >
                                {t('form.buttons.delete')}
                            </LoadingButton>
                        )}
                    </ButtonGroup>
                </Stack>
            </form>
            <Snackbar
                open={Boolean(notificationMsg)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={6000}
                onClose={handleClose}
                message={notificationMsg}
            />
        </PageWrapper>
    );
};
