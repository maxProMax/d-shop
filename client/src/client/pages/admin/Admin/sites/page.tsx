'use client';
import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ContainedButton } from '@/client/components/admin/atoms/button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Table } from '@/client/components/admin/molecules/table';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { Site } from '@/commerce/shop/admin/types';
import {
    LinkBareSite,
    LinkBareSiteCreate,
} from '@/client/modules/router/admin/links';

export const SitesPage: FC<{ sites: Site[] }> = ({ sites }) => {
    const t = useTranslations('admin');

    return (
        <PageWrapper>
            <ContainedButton size="small">
                <LinkBareSiteCreate>
                    {t('form.buttons.create')}
                </LinkBareSiteCreate>
            </ContainedButton>
            <Table
                table={{
                    head: [
                        t('page.admin.product.table.number'),
                        t('page.admin.sites.table.siteName'),
                        '',
                    ],
                    body: sites.map((site, i) => [
                        i + 1,
                        site.siteName,
                        <LinkBareSite key={site.id} id={site.id}>
                            <MoreVertIcon />
                        </LinkBareSite>,
                    ]),
                }}
            />
        </PageWrapper>
    );
};
