'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Logout from '@mui/icons-material/Logout';
import { logout } from '@/commerce/shop/admin/client';
import { TextButton } from '@/client/components/atoms/button';
import styles from './styles.module.css';

export const LogoutBtn: FC = () => {
    const t = useTranslations();
    const handleClick = () => {
        logout();
    };

    return (
        <TextButton
            onClick={handleClick}
            className={styles.button}
            color="inherit"
        >
            {t('admin.form.buttons.logout')}
            <Logout />
        </TextButton>
    );
};
