'use client';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { useTranslations } from 'next-intl';
import { login } from '@/commerce/shop/admin/client';
import { useAdminNavigation } from '@/client/modules/router/admin/hook';

type Inputs = Parameters<typeof login>[0];

export const LoginPage: FC = () => {
    const { goToAdmin } = useAdminNavigation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>();
    const t = useTranslations('admin');
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // login('john1@email.com', 'password');
        await login(data);
        goToAdmin();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <TextField
                    label={t('form.field.email.placeholder')}
                    variant="outlined"
                    type="email"
                    {...register('email')}
                />
                <TextField
                    label={t('form.field.password.placeholder')}
                    variant="outlined"
                    type="password"
                    {...register('password')}
                />
                <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    variant="contained"
                >
                    {t('form.buttons.login')}
                </LoadingButton>
            </Stack>
        </form>
    );
};
