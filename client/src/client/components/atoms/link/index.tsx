import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import styles from './styles.module.css';

export type LinkProps = PropsWithChildren<
    NextLinkProps & { activeClassName?: string }
>;

export const Link: FC<LinkProps> = ({ activeClassName, ...props }) => {
    const pathname = usePathname();

    return (
        <NextLink
            className={clsx(
                styles.link,
                pathname.startsWith(props.href.toString()) && activeClassName
            )}
            {...props}
        />
    );
};
