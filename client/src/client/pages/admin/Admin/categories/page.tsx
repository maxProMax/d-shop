'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import CategoryIcon from '@mui/icons-material/Category';
import styles from './styles.module.css';

export const CategoriesPage: FC = () => {
    const t = useTranslations('admin');

    return (
        <div className={styles.mainPage}>
            <div className={styles.content}>
                <CategoryIcon />
                {t('page.admin.category.page.main')}
            </div>
        </div>
    );
};
