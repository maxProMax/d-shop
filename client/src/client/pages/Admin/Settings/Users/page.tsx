'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AdminUser } from '@/commerce/shop/admin/types';
import {
    LinkBareAdminUser,
    LinkBareAddAdminUser,
} from '@/client/modules/router/admin/links';
import { PageWrapper } from '@/client/components/atoms/admin/layout';
import { ContainedButton } from '@/client/components/atoms/button';
import styles from './styles.module.css';

export const UsersPage: FC<{ users: AdminUser[] }> = ({ users }) => {
    const t = useTranslations('admin');

    return (
        <PageWrapper>
            <ContainedButton>
                <LinkBareAddAdminUser>
                    {t('page.admin.settings.users.actions.add')}
                </LinkBareAddAdminUser>
            </ContainedButton>
            <TableContainer component={Paper} classes={{ root: styles.table }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {t('page.admin.settings.users.table.email')}
                            </TableCell>
                            <TableCell>
                                {t('page.admin.settings.users.table.name')}
                            </TableCell>
                            <TableCell>
                                {t('page.admin.settings.users.table.lastname')}
                            </TableCell>
                            <TableCell>
                                {t('page.admin.settings.users.table.role')}
                            </TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row">
                                    {user.email}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.firstName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.lastName}
                                </TableCell>
                                <TableCell>{user.type}</TableCell>
                                <TableCell align="right">
                                    <LinkBareAdminUser id={user.id}>
                                        <MoreVertIcon />
                                    </LinkBareAdminUser>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </PageWrapper>
    );
};
