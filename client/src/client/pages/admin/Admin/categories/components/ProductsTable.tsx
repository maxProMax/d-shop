import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    addProductToCategory,
    deleteProductFromCategory,
} from '@/commerce/shop/admin/client';
import { Table } from '@/client/components/admin/molecules/table';
import styles from './styles.module.css';
import { Product } from '@/commerce/shop/admin/types';

export const ProductsTable: FC<{
    products?: Product[];
    categoryId?: string;
    addedProducts?: Set<string>;
}> = ({ addedProducts, products = [], categoryId }) => {
    const t = useTranslations('admin');
    const router = useRouter();
    const handleAction = async (productId: string, isAdd = false) => {
        if (categoryId) {
            if (isAdd) {
                await addProductToCategory(categoryId, productId);
            } else {
                await deleteProductFromCategory(categoryId, productId);
            }

            router.refresh();
        }
    };
    const table = {
        head: [t('table.number'), t('table.name'), ''],
        body: products?.map((p, i) => [
            i + 1,
            p.name,
            <div className={styles.actions} key={i}>
                {addedProducts?.has(p.id) ? (
                    <span onClick={() => handleAction(p.id)}>
                        <RemoveIcon />
                    </span>
                ) : (
                    <span onClick={() => handleAction(p.id, true)}>
                        <AddIcon />
                    </span>
                )}
            </div>,
        ]),
    };

    return <Table table={table} />;
};
