'use client';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { useTranslations } from 'next-intl';
import { LinkBareSettingsUsers } from '@/client/modules/router/admin/links';
import PersonIcon from '@mui/icons-material/Person';
import styles from './styles.module.css';

export const SettingsPage = () => {
    const t = useTranslations('admin');

    return (
        <PageWrapper>
            <nav className={styles.page}>
                <LinkBareSettingsUsers>
                    <PersonIcon />
                    {t('page.admin.settings.links.users')}
                </LinkBareSettingsUsers>
            </nav>
        </PageWrapper>
    );
};
