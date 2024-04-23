'use client';
import { FC } from 'react';
// import { Image } from '@/client/components/common/image';
import { Product } from '@/commerce/shop/admin/types';
import { ContainedButton } from '@/client/components/storefront/atoms/button';
import { useAddToCart } from '@/client/modules/customer/user';
// import { LinkProduct } from '@/client/modules/router/client/links';

export const ProductPage: FC<{ product: Product }> = ({ product }) => {
    const { request, loading } = useAddToCart();
    const handleClick = () => {
        request(product.id);
    };

    console.log(product);

    return (
        <div>
            <h3>Product - {product.name}</h3>
            <ContainedButton onClick={handleClick} disabled={loading}>
                Add to cart
            </ContainedButton>
        </div>
    );
};
