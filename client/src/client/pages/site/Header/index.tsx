'use client';
import { FC } from 'react';
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Category, Site } from '@/commerce/shop/admin/types';
import { Image } from '@/client/components/common/image';
import { LinkCategory, LinkCart } from '@/client/modules/router/client/links';
import styles from './styles.module.css';
import { useUser } from '@/client/modules/customer/user/hooks';

export const Header: FC<{ category?: Category; site: Site }> = ({
    category,
    site,
}) => {
    const { cart } = useUser();

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
            <div className={styles.logoBlock}>
                <Image className={styles.logo} src={site.logo?.path} />
            </div>
            <div className={styles.icons}>
                <LinkCart>
                    <Badge badgeContent={cart?.items?.length} color="primary">
                        <ShoppingBasketIcon color="action" />
                    </Badge>
                </LinkCart>
            </div>
        </header>
    );
};
