'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Markdown } from '@/client/components/common/markdown';
import Divider from '@mui/material/Divider';
import { Product } from '@/commerce/shop/admin/types';
import { ContainedButton } from '@/client/components/storefront/atoms/button';
import { useAddToCart } from '@/client/modules/customer/user';
import { Image } from '@/client/components/common/image';
import styles from './styles.module.css';

export const ProductPage: FC<{ product: Product }> = ({ product }) => {
    const t = useTranslations('storefront');
    const { request, loading } = useAddToCart();
    const handleClick = () => {
        request(product.id);
    };

    console.log(product);

    return (
        <div className={styles.page}>
            {product.image && (
                <Image className={styles.image} src={product.image.path} />
            )}
            <h3>{product.name}</h3>
            <p>{`${product.price?.price} ${product.price?.currency?.symbol}`}</p>
            <Divider />
            <Markdown text={product.description} />
            {product.description && <Divider />}
            <ContainedButton onClick={handleClick} disabled={loading}>
                {t('button.cart.add')}
            </ContainedButton>
        </div>
    );
};
