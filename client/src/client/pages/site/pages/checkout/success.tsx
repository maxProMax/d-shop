import { FC } from 'react';
import { useTranslations } from 'next-intl';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Typography from '@mui/material/Typography';
import styles from './styles.module.css';

export const CheckoutSuccessPage: FC<{ orderId: string }> = ({ orderId }) => {
    const t = useTranslations('storefront');

    return (
        <div className={styles.page}>
            <Typography
                className={styles.text}
                textAlign={'center'}
                variant="h5"
            >
                <span
                    dangerouslySetInnerHTML={{
                        __html: t('page.checkout.success.title', { orderId }),
                    }}
                />
            </Typography>
            <CheckCircleOutlineIcon className={styles.icon} />
        </div>
    );
};
