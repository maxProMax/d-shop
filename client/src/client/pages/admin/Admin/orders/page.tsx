'use client';
import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Table } from '@/client/components/admin/molecules/table';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { Order } from '@/commerce/shop/admin/types';
import { LinkBareOrder } from '@/client/modules/router/admin/links';

export const OrdersPage: FC<{ orders: Order[] }> = ({ orders }) => {
    const t = useTranslations('admin');

    console.log(orders);

    const tableProps = {
        head: [
            t('table.number'),
            t('table.user-type'),
            t('table.email'),
            t('table.total'),
            '',
        ],
        body: orders.reduce<(string | ReactNode)[][]>((memo, order, i) => {
            return memo.concat([
                [
                    i + 1,
                    order.userType,
                    order.address?.email,
                    `${order.currency.symbol} ${order.total}`,
                    <LinkBareOrder key={order.id} id={String(order.id)}>
                        <MoreVertIcon />
                    </LinkBareOrder>,
                ],
            ]);
        }, []),
    };

    return (
        <PageWrapper>
            <Table table={tableProps} />
        </PageWrapper>
    );
};
