'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Typography } from '@mui/material';
import { Routes, RoutesDynamic } from '@/client/modules/router/admin/routes';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { Site, SiteForm } from '@/commerce/shop/admin/types';
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
import { useNotification } from '@/client/modules/admin/notification';
import { PageForm, FormContainer } from '@/client/components/admin/atoms/form';
import { useCategories } from './hooks';
import styles from './styles.module.css';

interface StateSite extends Omit<SiteForm, 'file'> {
    file?: FileList;
}

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
    const t = useTranslations('admin');
    const { categories, loading } = useCategories();
    const router = useRouter();
    const { enqueueSnackbar } = useNotification();
    const { logo, ...rest } = site || {};
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        getValues,
    } = useForm<StateSite>({
        defaultValues: rest
            ? { ...rest, navigation: site?.navigation?.id }
            : {},
    });

    const onSubmit: SubmitHandler<StateSite> = async (data) => {
        const reqData = {
            siteName: data.siteName,
            navigation: data.navigation,
            file: data?.file?.[0],
        };

        if (site?.id) {
            await updateSite(site.id, reqData);
            enqueueSnackbar(t('notifications.submit.saved'));
        } else {
            const resp = await createSite(reqData);
            enqueueSnackbar(t('notifications.submit.created'));
            router.push(RoutesDynamic.adminSiteEdit(resp.data.id));
        }

        router.refresh();
    };
    const onDelete = async () => {
        if (site?.id) {
            await deleteSite(site?.id);
            enqueueSnackbar(t('notifications.submit.deleted'));
            router.push(Routes.ADMIN_SITE);
            router.refresh();
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
                        <Typography variant="caption">
                            {t('form.text.id', { id: site.id })}
                        </Typography>
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
                    <FormControl>
                        <InputLabel id="c">
                            {t('page.admin.sites.page.form.navigation.label')}
                        </InputLabel>
                        <Select
                            labelId="c"
                            label={t(
                                'page.admin.sites.page.form.navigation.label'
                            )}
                            disabled={loading}
                            defaultValue={getValues().navigation}
                            {...register('navigation')}
                        >
                            {categories.map((c) => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <ButtonGroup buttons={buttons} />
                </PageForm>
            </FormContainer>
        </PageWrapper>
    );
};
