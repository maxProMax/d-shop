'use client';
import { useUser } from '@/client/modules/customer/user';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
// import { Image } from '@/client/components/common/image';
// import { Product } from '@/commerce/shop/admin/types';
import { ContainedButton } from '@/client/components/storefront/atoms/button';
import { useFetch } from '@/client/modules/customer/network';
import { checkout } from '@/commerce/shop/admin/client';
import { useRouter } from 'next/navigation';
import { Routes } from '@/client/modules/router/storefront/routes';
import { Image } from '@/client/components/common/image';
import styles from './styles.module.css';
// import { useAddToCart } from '@/client/modules/customer/user';
// import { LinkProduct } from '@/client/modules/router/client/links';

export const CartPage: FC = () => {
    const t = useTranslations('storefront');
    const { cart } = useUser();
    const router = useRouter();
    const { request } = useFetch(checkout);

    if (!cart?.items.length) {
        return <div>{t('page.cart.title-empty')}</div>;
    }

    const handleClick = async () => {
        await request();
        router.push(Routes.CHECKOUT_SUCCESS);
    };

    return (
        <div className={styles.cart}>
            <h2>{t('page.cart.title')}</h2>
            <section className={styles.list}>
                {cart?.items.map((item) => (
                    <article className={styles.item} key={item.id}>
                        <Image
                            className={styles.image}
                            src={item.product.image?.path}
                        />
                        <div className={styles.desc}>
                            <span>{item.product.name} </span>
                            <span>{`${item.product.price?.price} ${item.product.price?.currency?.symbol}`}</span>
                        </div>
                    </article>
                ))}
            </section>
            <p>
                Всього: {cart.total} {cart.currency.symbol}
            </p>
            <ContainedButton onClick={handleClick}>checkout</ContainedButton>
        </div>
    );
};
