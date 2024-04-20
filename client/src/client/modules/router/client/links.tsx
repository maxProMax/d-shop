import { FC } from 'react';
import { Routes } from './routes';
import {
    Link,
    LinkProps as DefaultLinkProps,
} from '@/client/components/admin/atoms/link';

type LinkProps = Omit<DefaultLinkProps, 'href'>;

type AdditionalProps = {
    slug?: string;
};

export const LinkCategory: FC<LinkProps & AdditionalProps> = ({
    slug = '',
    ...props
}) => {
    return <Link href={`${Routes.CATEGORY}/${slug}`} {...props} />;
};
