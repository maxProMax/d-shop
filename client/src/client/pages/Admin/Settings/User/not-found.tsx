'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import { PageWrapper } from '@/client/components/atoms/admin/layout';

export const UserPageNotFound: FC = () => {
    const t = useTranslations('admin');

    return (
        <PageWrapper>
            <Box textAlign={'center'}>
                <h3>{t('page.admin.settings.users.not-found')}</h3>
            </Box>
        </PageWrapper>
    );
};
