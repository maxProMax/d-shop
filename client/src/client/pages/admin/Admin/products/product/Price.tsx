'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Currency, Price as PriceType } from '@/commerce/shop/admin/types';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { createProductPrice } from '@/commerce/shop/admin/client';
import { ContainedButton } from '@/client/components/admin/atoms/button';
import styles from './styles.module.css';

export const Price: FC<{
    currency?: Currency;
    productId: string;
    defaultValues: { price?: number; discountPrice?: number };
}> = ({ currency, defaultValues, productId }) => {
    const t = useTranslations('admin');
    const {
        register,
        getValues,
        formState: { isSubmitting },
    } = useForm<PriceType>({ defaultValues });

    const handleClick = () => {
        createProductPrice(productId, {
            price: Number(getValues().price),
            discountPrice: Number(getValues().discountPrice),
            currency: currency?.id,
        });
    };

    return (
        <div className={styles.priceBlock}>
            {currency?.code}:
            <div className={styles.priceFields}>
                <TextField
                    label={t('form.field.price.placeholder')}
                    disabled={isSubmitting}
                    type="number"
                    {...register('price')}
                />
                <TextField
                    label={t('form.field.discount-price.placeholder')}
                    disabled={isSubmitting}
                    type="number"
                    {...register('discountPrice')}
                />
                <ContainedButton onClick={handleClick} size="small">
                    {t('form.buttons.create')}
                </ContainedButton>
            </div>
        </div>
    );
};
