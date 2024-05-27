'use client';
import { FC } from 'react';
import { Image } from '@/client/components/common/image';
import { Category } from '@/commerce/shop/admin/types';
import Typography from '@mui/material/Typography';
import styles from './styles.module.css';
import { ProductList } from '@/client/components/storefront/organism/productList';

export const CategoryPage: FC<{ category?: Category }> = ({ category }) => {
    return (
        <div className={styles.page}>
            {category?.banner && (
                <Image
                    alt={category.banner.originalname || ''}
                    className={styles.banner}
                    src={category.banner?.path}
                />
            )}
            {category?.description && (
                <Typography className={styles.description}>
                    {category?.description}
                </Typography>
            )}
            <ProductList products={category?.products} />
        </div>
    );
};
