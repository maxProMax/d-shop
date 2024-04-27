'use client';
import { useUser } from '@/client/modules/customer/user';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { ContainedButton } from '@/client/components/storefront/atoms/button';
import { useFetch } from '@/client/modules/customer/network';
import { checkout } from '@/commerce/shop/admin/client';
import { useRouter } from 'next/navigation';
import { RoutesDynamic } from '@/client/modules/router/storefront/routes';
import { Image } from '@/client/components/common/image';
import styles from './styles.module.css';
import { AddressForm } from '@/commerce/shop/admin/types';

export const CartPage: FC = () => {
    const t = useTranslations('storefront');
    const { cart } = useUser();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AddressForm>();
    const { request, error } = useFetch(checkout);
    const onSubmit = async (data: AddressForm) => {
        try {
            const {
                data: { orderId },
            } = await request(data);
            router.push(RoutesDynamic.checkoutSuccess(orderId));
        } catch {}
    };

    if (!cart?.items.length) {
        return <div>{t('page.cart.title-empty')}</div>;
    }

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
            <p className={styles.summery}>
                {t('page.cart.summery', {
                    currency: cart.currency.symbol,
                    amount: cart.total,
                })}
            </p>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <Alert severity="error">
                        {(error.response?.data as any)?.message?.join(' ')}
                    </Alert>
                )}
                <TextField
                    label={t('form.field.email.placeholder')}
                    type="email"
                    {...register('email', { required: true })}
                />
                <TextField
                    label={t('form.field.address.placeholder')}
                    {...register('address', { required: true })}
                />
                <TextField
                    label={t('form.field.country.placeholder')}
                    {...register('country', { required: true })}
                />
                <TextField
                    label={t('form.field.phone.placeholder')}
                    type="tel"
                    {...register('phone', { required: true })}
                />
                <ContainedButton type="submit">
                    {t('page.cart.checkout')}
                </ContainedButton>
            </form>
        </div>
    );
};
