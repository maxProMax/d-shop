import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import styles from './styles.module.css';

export type LinkProps = PropsWithChildren<
    NextLinkProps & {
        activeClassName?: string;
        className?: string;
        ariaLabel?: string;
    }
>;

export const Link: FC<LinkProps> = ({
    activeClassName,
    className,
    ariaLabel,
    ...props
}) => {
    const pathname = usePathname();

    return (
        <NextLink
            aria-label={ariaLabel}
            className={clsx(
                styles.link,
                className,
                pathname.startsWith(props.href.toString()) && activeClassName
            )}
            {...props}
        />
    );
};
