import { FC } from 'react';
import { useTranslations } from 'next-intl';
import styles from './styles.module.css';

export const Footer: FC = () => {
    const t = useTranslations('storefront');
    return (
        <footer className={styles.footer}>
            <div className={styles.wrapper}>
                <nav>
                    <div className={styles.col}>
                        <p className={styles.colTitle}>
                            {t('footer.contacts.title')}
                        </p>
                        <ul className={styles.list}>
                            <li>{t('footer.contacts.phone')}</li>
                            <li>
                                <a
                                    className={styles.email}
                                    href={`mailto:${t(
                                        'footer.contacts.email'
                                    )}`}
                                >
                                    {t('footer.contacts.email')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </footer>
    );
};
