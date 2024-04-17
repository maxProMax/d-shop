'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { LinkBareSettings } from '@/client/modules/router/admin/links';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './styles.module.css';

const LinkSettings: FC = () => {
    const t = useTranslations('admin');

    return (
        <LinkBareSettings activeClassName={styles.linkActive}>
            <SettingsIcon />
            {t('page.admin.sidebar.item.settings')}
        </LinkBareSettings>
    );
};

export const SideBar: FC = () => {
    return (
        <ul className={styles.sidebar}>
            <li>
                <LinkSettings />
            </li>
        </ul>
    );
};
