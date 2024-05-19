'use client';
import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import {
    Currency,
    AdminProduct,
    Order,
    AddressForm,
} from '@/commerce/shop/admin/types';
import { PageForm, FormContainer } from '@/client/components/admin/atoms/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { ContainedButton } from '@/client/components/admin/atoms/button';
import {
    createProduct,
    updateProduct,
    deleteProduct,
    orderAddressCreate,
    addressUpdate,
} from '@/commerce/shop/admin/client';
import {
    ButtonGroup,
    IActionButton,
} from '@/client/components/admin/atoms/button';
import { useNotification } from '@/client/modules/admin/notification';
import { Routes, RoutesDynamic } from '@/client/modules/router/admin/routes';
import { Table } from '@/client/components/admin/molecules/table';
import styles from './styles.module.css';
import { useFetch } from '@/client/modules/customer/network';

export const OrderPage: FC<{
    order: Order;
}> = ({ order }) => {
    const router = useRouter();
    const t = useTranslations('admin');
    const {
        register,
        handleSubmit,
        formState: { isSubmitting: loading },
    } = useForm<AddressForm>({ defaultValues: order.address });
    const { request: update } = useFetch(addressUpdate);
    const { request: create } = useFetch(orderAddressCreate);

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
                        order.product?.[0]?.name,
                        `${order.currency?.symbol} ${order.price}`,
                    ],
                ]);
            },
            []
        ),
    };

    const onSubmit = async (data: AddressForm) => {
        if (order.address?.id) {
            await update(order.address?.id, data);
        } else if (order.id) {
            await create(order.id, data);
        }

        router.refresh();
    };

    return (
        <PageWrapper>
            <div className={styles.page}>
                <Table table={tableProps} />
                <p>{t('page.admin.order.page.address.title')}</p>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label={t('form.field.email.placeholder')}
                        type="email"
                        {...register('email', { required: true })}
                    />
                    <TextField
                        label={t('form.field.address.placeholder')}
                        {...register('address', { required: true })}
                    />
                    <TextField
                        label={t('form.field.country.placeholder')}
                        {...register('country', { required: true })}
                    />
                    <TextField
                        label={t('form.field.phone.placeholder')}
                        type="tel"
                        {...register('phone', { required: true })}
                    />
                    <ContainedButton
                        disabled={loading}
                        size="small"
                        type="submit"
                    >
                        {!order.address
                            ? t('form.buttons.create')
                            : t('form.buttons.edit')}
                    </ContainedButton>
                </form>
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
            </div>
        </PageWrapper>
    );
};
