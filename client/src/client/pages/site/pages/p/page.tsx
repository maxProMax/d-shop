'use client';
import { FC } from 'react';
// import { Image } from '@/client/components/common/image';
import { Product } from '@/commerce/shop/admin/types';
// import { LinkProduct } from '@/client/modules/router/client/links';

export const ProductPage: FC<{ product: Product }> = ({ product }) => {
    return (
        <div>
            <h3>Product - {product.name}</h3>
        </div>
    );
};
