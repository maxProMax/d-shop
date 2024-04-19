'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import {
    LinkBareSettings,
    LinkBareProducts,
    LinkBareCategories,
    LinkBareSites,
} from '@/client/modules/router/admin/links';
import CategoryIcon from '@mui/icons-material/CategoryOutlined';
import StoreIcon from '@mui/icons-material/StoreOutlined';
import WebIcon from '@mui/icons-material/WebOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import Divider from '@mui/material/Divider';
import styles from './styles.module.css';

export const SideBar: FC = () => {
    const t = useTranslations('admin');
    return (
        <ul className={styles.sidebar}>
            <li className={styles.item}>
                <LinkBareCategories activeClassName={styles.linkActive}>
                    <CategoryIcon />
                    {t('page.admin.sidebar.item.categories')}
                </LinkBareCategories>
            </li>
            <li className={styles.item}>
                <LinkBareProducts activeClassName={styles.linkActive}>
                    <StoreIcon />
                    {t('page.admin.sidebar.item.products')}
                </LinkBareProducts>
            </li>
            <li className={styles.item}>
                <LinkBareSites activeClassName={styles.linkActive}>
                    <WebIcon />
                    {t('page.admin.sidebar.item.sites')}
                </LinkBareSites>
            </li>
            <li className={styles.item}>
                <Divider />
            </li>
            <li className={styles.item}>
                <LinkBareSettings activeClassName={styles.linkActive}>
                    <SettingsIcon />
                    {t('page.admin.sidebar.item.settings')}
                </LinkBareSettings>
            </li>
        </ul>
    );
};
