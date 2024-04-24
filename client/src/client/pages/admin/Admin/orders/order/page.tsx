'use client';
import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { Currency, AdminProduct, Order } from '@/commerce/shop/admin/types';
import { PageForm, FormContainer } from '@/client/components/admin/atoms/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import {
    createProduct,
    updateProduct,
    deleteProduct,
} from '@/commerce/shop/admin/client';
import {
    ButtonGroup,
    IActionButton,
} from '@/client/components/admin/atoms/button';
import { useNotification } from '@/client/modules/admin/notification';
import { Routes, RoutesDynamic } from '@/client/modules/router/admin/routes';
import { Table } from '@/client/components/admin/molecules/table';
import styles from './styles.module.css';

export const OrderPage: FC<{
    order: Order;
}> = ({ order }) => {
    const t = useTranslations('admin');

    console.log(order);

    const tableProps = {
        head: [
            t('table.number'),
            t('table.amount'),
            t('table.name'),
            t('table.total'),
        ],
        body: (order?.orderDetails || []).reduce<(string | ReactNode)[][]>(
            (memo, order, i) => {
                return memo.concat([
                    [
                        i + 1,
                        order.amount,
                        order.product?.name,
                        `${order.currency?.symbol} ${order.price}`,
                    ],
                ]);
            },
            []
        ),
    };

    return (
        <PageWrapper>
            <Table table={tableProps} />
            <div className={styles.summeryBlock}>
                <ul className={styles.summery}>
                    <li>
                        <span>{t('page.admin.order.page.order-id')}:</span>
                        <span className={styles.id}>{` ${order.id}`}</span>
                    </li>
                    <li>
                        <span className={styles.title}>
                            {t('page.admin.order.page.total')}:
                        </span>
                        {` ${order.currency.symbol} ${order.total}`}
                    </li>
                </ul>
            </div>
        </PageWrapper>
    );
};
