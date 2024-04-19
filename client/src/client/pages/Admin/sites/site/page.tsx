'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { Site } from '@/commerce/shop/admin/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {
    deleteSite,
    createSite,
    updateSite,
} from '@/commerce/shop/admin/client';
import { Image } from '@/client/components/common/image';
import { UploadButton } from '@/client/components/admin/atoms/button';
import {
    ButtonGroup,
    IActionButton,
} from '@/client/components/admin/atoms/button';
import { Typography } from '@mui/material';
import { useNotification } from '@/client/modules/admin/notification';
import styles from './styles.module.css';
import { PageForm, FormContainer } from '@/client/components/admin/atoms/form';

type StateSite = Site & { file?: FileList };

const Title: FC<{ isEdit: boolean }> = ({ isEdit }) => {
    const t = useTranslations('admin');

    return (
        <Typography variant="h6">
            {isEdit
                ? t('page.admin.sites.page.title.edit')
                : t('page.admin.sites.page.title.create')}
        </Typography>
    );
};

export const SitePage: FC<{ site?: Site }> = ({ site }) => {
    const { enqueueSnackbar } = useNotification();
    const t = useTranslations('admin');
    const { logo, ...rest } = site || {};
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<StateSite>({ defaultValues: rest ? rest : {} });

    const onSubmit: SubmitHandler<StateSite> = async (data) => {
        const reqData = {
            siteName: data.siteName,
            file: data?.file?.[0],
        };

        if (site?.id) {
            await updateSite(site.id, reqData);
            enqueueSnackbar(t('notifications.submit.saved'));
        } else {
            await createSite(reqData);
            enqueueSnackbar(t('notifications.submit.created'));
        }
    };
    const onDelete = async () => {
        if (site?.id) {
            await deleteSite(site?.id);
            enqueueSnackbar(t('notifications.submit.deleted'));
        }
    };

    const buttons: IActionButton[] = [
        {
            actionType: site ? 'edit' : 'create',
            type: 'submit',
            loading: isSubmitting,
        },
    ];

    site && buttons.push({ actionType: 'delete', action: onDelete });

    return (
        <PageWrapper>
            <FormContainer>
                <Title isEdit={Boolean(site)} />
                <PageForm onSubmit={handleSubmit(onSubmit)}>
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
                    <ButtonGroup buttons={buttons} />
                </PageForm>
            </FormContainer>
        </PageWrapper>
    );
};
