'use client';
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { Site } from '@/commerce/shop/admin/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import {
    deleteSite,
    createAdminUser,
    deleteAdminUser,
    createSite,
} from '@/commerce/shop/admin/client';
import { Image } from '@/client/components/common/image';
import { UploadButton } from '@/client/components/admin/atoms/button';
import styles from './styles.module.css';

type StateSite = Site & { file?: FileList };

export const SitePage: FC<{ site?: Site }> = ({ site }) => {
    const t = useTranslations('admin');
    const { logo, ...rest } = site || {};

    const [notificationMsg, setMsg] = useState('');
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<StateSite>({ defaultValues: rest ? rest : {} });

    const onSubmit: SubmitHandler<StateSite> = async (data) => {
        // const formData = new FormData();
        // formData.append('siteName', data.siteName);
        // createSite(formData);

        createSite({ siteName: data.siteName, file: data?.file?.[0] });

        // if (user?.id) {
        //     await updateAdminUser(user.id, {
        //         firstName: data.firstName,
        //         lastName: data.lastName,
        //     });
        //     setMsg(t('notifications.submit.saved'));
        // } else {
        //     await createAdminUser(data);
        //     setMsg(t('notifications.submit.created'));
        // }
    };
    const onDelete = async () => {
        site?.id && (await deleteSite(site?.id));
        // setMsg(t('notifications.submit.deleted'));
    };
    const handleClose = (event: any, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setMsg('');
    };

    return (
        <PageWrapper>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    {site?.id && (
                        <TextField
                            label={t('form.field.id.placeholder')}
                            variant="outlined"
                            type="email"
                            disabled={true}
                            {...register('id')}
                        />
                    )}
                    <TextField
                        label={t('form.field.name.placeholder')}
                        variant="outlined"
                        disabled={isSubmitting}
                        {...register('siteName')}
                    />
                    <div className={styles.logoBlock}>
                        <span>{t('form.field.logo.placeholder')}</span>
                        {logo && <Image src={logo?.path} />}
                        <UploadButton register={register('file')} />
                    </div>

                    <ButtonGroup>
                        <LoadingButton loading={isSubmitting} type="submit">
                            {site
                                ? t('form.buttons.edit')
                                : t('form.buttons.create')}
                        </LoadingButton>
                        {site && (
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
        </PageWrapper>
    );
};
