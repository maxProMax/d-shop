import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import styles from './styles.module.css';

export type LinkProps = PropsWithChildren<
    NextLinkProps & { activeClassName?: string; className?: string }
>;

export const Link: FC<LinkProps> = ({
    activeClassName,
    className,
    ...props
}) => {
    const pathname = usePathname();

    return (
        <NextLink
            className={clsx(
                styles.link,
                className,
                pathname.startsWith(props.href.toString()) && activeClassName
            )}
            {...props}
        />
    );
};
