'use client';
import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AdminUser } from '@/commerce/shop/admin/types';
import {
    LinkBareAdminUser,
    LinkBareAddAdminUser,
} from '@/client/modules/router/admin/links';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { ContainedButton } from '@/client/components/admin/atoms/button';
import { Table } from '@/client/components/admin/molecules/table';

export const UsersPage: FC<{ users: AdminUser[] }> = ({ users }) => {
    const t = useTranslations('admin');

    const tableProps = {
        head: [
            t('page.admin.settings.users.table.email'),
            t('page.admin.settings.users.table.name'),
            t('page.admin.settings.users.table.lastname'),
            t('page.admin.settings.users.table.role'),
        ],
        body: users.reduce<(string | ReactNode)[][]>((memo, user) => {
            return memo.concat([
                [
                    user.email,
                    user.firstName,
                    user.lastName,
                    user.type,
                    <LinkBareAdminUser key={user.id} id={user.id}>
                        <MoreVertIcon />
                    </LinkBareAdminUser>,
                ],
            ]);
        }, []),
    };

    return (
        <PageWrapper>
            <ContainedButton>
                <LinkBareAddAdminUser>
                    {t('page.admin.settings.users.actions.add')}
                </LinkBareAddAdminUser>
            </ContainedButton>

            <Table table={tableProps} />
        </PageWrapper>
    );
};
