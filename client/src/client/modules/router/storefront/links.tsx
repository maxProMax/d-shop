import { FC } from 'react';
import { Routes } from './routes';
import {
    Link,
    LinkProps as DefaultLinkProps,
} from '@/client/components/storefront/atoms/link';

type LinkProps = Omit<DefaultLinkProps, 'href'>;

type AdditionalProps = {
    slug?: string;
};

export const LinkHome: FC<LinkProps> = ({ ariaLabel, ...props }) => {
    return <Link ariaLabel="home" href={Routes.HOME} {...props} />;
};

export const LinkCategory: FC<LinkProps & AdditionalProps> = ({
    slug = '',
    ...props
}) => {
    return <Link href={`${Routes.CATEGORY}/${slug}`} {...props} />;
};

export const LinkProduct: FC<LinkProps & AdditionalProps> = ({
    slug = '',
    ...props
}) => {
    return <Link href={`${Routes.PRODUCT}/${slug}`} {...props} />;
};

export const LinkCart: FC<LinkProps> = ({ ariaLabel, ...props }) => {
    return <Link ariaLabel="cart" href={Routes.CART} {...props} />;
};
