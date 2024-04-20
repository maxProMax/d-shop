'use client';
import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ContainedButton } from '@/client/components/admin/atoms/button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { Product } from '@/commerce/shop/admin/types';
import { Table } from '@/client/components/admin/molecules/table';
import {
    LinkBareProduct,
    LinkBareProductCreate,
} from '@/client/modules/router/admin/links';

export const ProductsPage: FC<{ products: Product[] }> = ({ products }) => {
    const t = useTranslations('admin');

    const tableProps = {
        head: [
            t('page.admin.product.table.number'),
            t('page.admin.product.table.name'),
            '',
        ],
        body: products.reduce<(string | ReactNode)[][]>((memo, product, i) => {
            return memo.concat([
                [
                    i + 1,
                    product.name,
                    <LinkBareProduct key={product.id} id={product.id}>
                        <MoreVertIcon />
                    </LinkBareProduct>,
                ],
            ]);
        }, []),
    };
    return (
        <PageWrapper>
            <ContainedButton>
                <LinkBareProductCreate>
                    {t('form.buttons.create')}
                </LinkBareProductCreate>
            </ContainedButton>
            <Table table={tableProps} />
        </PageWrapper>
    );
};
