'use client';
import { FC, useState } from 'react';
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuIcon from '@mui/icons-material/Menu';
import { Category, Site } from '@/commerce/shop/admin/types';
import { Image } from '@/client/components/common/image';
import {
    LinkCategory,
    LinkCart,
    LinkHome,
} from '@/client/modules/router/storefront/links';
import { useUser } from '@/client/modules/customer/user/hooks';
import { Drawer } from '@/client/components/storefront/molecule/drawer';
import styles from './styles.module.css';

export const Header: FC<{ category?: Category; site: Site }> = ({
    category,
    site,
}) => {
    const { cart } = useUser();
    const [open, toggle] = useState(false);

    const handleClick = () => {
        toggle(true);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.logoBlock}>
                    <LinkHome>
                        <Image
                            alt="logo"
                            className={styles.logo}
                            src={site.logo?.path}
                        />
                    </LinkHome>
                </div>
                <nav className={styles.navDesktop}>
                    {category?.children.map((child) => (
                        <div className={styles.linkWrapper} key={child.id}>
                            <LinkCategory
                                className={styles.link}
                                slug={child.url}
                            >
                                {child.name}
                            </LinkCategory>
                        </div>
                    ))}
                </nav>
                <div className={styles.icons}>
                    <LinkCart>
                        <Badge
                            badgeContent={cart?.items?.length}
                            color="primary"
                        >
                            <ShoppingBasketIcon color="action" />
                        </Badge>
                    </LinkCart>
                    <span className={styles.menu} onClick={handleClick}>
                        <MenuIcon />
                    </span>
                    <Drawer open={open} toggle={toggle}>
                        <nav className={styles.navMobile}>
                            {category?.children.map((child) => (
                                <div key={child.id}>
                                    <LinkCategory
                                        className={styles.link}
                                        slug={child.url}
                                    >
                                        {child.name}
                                    </LinkCategory>
                                </div>
                            ))}
                        </nav>
                    </Drawer>
                </div>
            </div>
        </header>
    );
};
