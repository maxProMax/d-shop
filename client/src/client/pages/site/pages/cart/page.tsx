'use client';
import { useUser } from '@/client/modules/customer/user';
import { FC } from 'react';
// import { Image } from '@/client/components/common/image';
// import { Product } from '@/commerce/shop/admin/types';
// import { ContainedButton } from '@/client/components/storefront/atoms/button';
// import { useAddToCart } from '@/client/modules/customer/user';
// import { LinkProduct } from '@/client/modules/router/client/links';

export const CartPage: FC = () => {
    const { cart } = useUser();

    if (!cart?.items.length) {
        return <div>Cart is empty</div>;
    }

    return (
        <div>
            <h2>Cart</h2>
            {cart?.items.map((item) => (
                <li key={item.id}>
                    {item.product.name} {item.product.price?.price}{' '}
                    {item.product.price?.currency?.symbol}
                </li>
            ))}
            <p>
                Всього: {cart.total} {cart.currency.symbol}
            </p>
        </div>
    );
};
