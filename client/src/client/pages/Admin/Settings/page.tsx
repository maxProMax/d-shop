'use client';
import { PageWrapper } from '@/client/components/atoms/admin/layout';
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
                <div>link 2</div>
                <div>link 3</div>
                <div>link 4</div>
            </nav>
        </PageWrapper>
    );
};
