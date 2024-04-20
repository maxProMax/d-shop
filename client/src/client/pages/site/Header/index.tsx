'use client';
import { FC } from 'react';
import { Category, Site } from '@/commerce/shop/admin/types';
import { Image } from '@/client/components/common/image';
import { LinkCategory } from '@/client/modules/router/client/links';
import styles from './styles.module.css';

export const Header: FC<{ category?: Category; site: Site }> = ({
    category,
    site,
}) => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {category?.children.map((child) => (
                    <div key={child.id}>
                        <LinkCategory slug={child.url}>
                            {child.name}
                        </LinkCategory>
                    </div>
                ))}
            </nav>
            <Image className={styles.logo} src={site.logo?.path} />
            <div></div>
        </header>
    );
};
