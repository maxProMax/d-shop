'use client';
import { FC } from 'react';
import { Product } from '@/commerce/shop/admin/types';
import { ProductList } from '@/client/components/storefront/organism/productList';

export const HomePage: FC<{ products: Product[] }> = ({ products }) => {
    console.log(products);

    return (
        <main>
            <ProductList products={products} />
        </main>
    );
};
