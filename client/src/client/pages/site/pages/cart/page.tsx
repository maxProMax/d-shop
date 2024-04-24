'use client';
import { useUser } from '@/client/modules/customer/user';
import { FC } from 'react';
// import { Image } from '@/client/components/common/image';
// import { Product } from '@/commerce/shop/admin/types';
import { ContainedButton } from '@/client/components/storefront/atoms/button';
import { useFetch } from '@/client/modules/customer/network';
import { checkout } from '@/commerce/shop/admin/client';
import { useRouter } from 'next/navigation';
import { Routes } from '@/client/modules/router/client/routes';
// import { useAddToCart } from '@/client/modules/customer/user';
// import { LinkProduct } from '@/client/modules/router/client/links';

export const CartPage: FC = () => {
    const { cart } = useUser();
    const router = useRouter();
    const { request } = useFetch(checkout);

    if (!cart?.items.length) {
        return <div>Cart is empty</div>;
    }

    const handleClick = async () => {
        await request();
        router.push(Routes.CHECKOUT_SUCCESS);
    };

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
            <ContainedButton onClick={handleClick}>checkout</ContainedButton>
        </div>
    );
};
