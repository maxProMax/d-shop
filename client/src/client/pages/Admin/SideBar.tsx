'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import {
    LinkBareSettings,
    LinkBareProducts,
    LinkBareCategories,
    LinkBareSites,
} from '@/client/modules/router/admin/links';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './styles.module.css';

export const SideBar: FC = () => {
    const t = useTranslations('admin');
    return (
        <ul className={styles.sidebar}>
            <li>
                <LinkBareCategories activeClassName={styles.linkActive}>
                    <SettingsIcon />
                    {t('page.admin.sidebar.item.categories')}
                </LinkBareCategories>
            </li>
            <li>
                <LinkBareProducts activeClassName={styles.linkActive}>
                    <SettingsIcon />
                    {t('page.admin.sidebar.item.products')}
                </LinkBareProducts>
            </li>
            <li>
                <LinkBareSites activeClassName={styles.linkActive}>
                    <SettingsIcon />
                    {t('page.admin.sidebar.item.sites')}
                </LinkBareSites>
            </li>
            <li>
                <LinkBareSettings activeClassName={styles.linkActive}>
                    <SettingsIcon />
                    {t('page.admin.sidebar.item.settings')}
                </LinkBareSettings>
            </li>
        </ul>
    );
};
