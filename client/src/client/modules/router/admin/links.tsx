import { FC } from 'react';
import { Routes } from './routes';
import {
    Link,
    LinkProps as DefaultLinkProps,
} from '@/client/components/admin/atoms/link';

type LinkProps = Omit<DefaultLinkProps, 'href'>;

type AdditionalProps = {
    id: string | number;
};

export const LinkBareAdmin: FC<LinkProps> = (props) => {
    return <Link href={Routes.ADMIN} {...props} />;
};

export const LinkBareSettings: FC<LinkProps> = (props) => {
    return <Link href={Routes.ADMIN_SETTINGS} {...props} />;
};

export const LinkBareAdminUser: FC<LinkProps & AdditionalProps> = ({
    id,
    ...props
}) => {
    return <Link href={`${Routes.ADMIN_SETTINGS_USER}/${id}`} {...props} />;
};

export const LinkBareSettingsUsers: FC<LinkProps> = (props) => {
    return <Link href={Routes.ADMIN_SETTINGS_USERS} {...props} />;
};

export const LinkBareAddAdminUser: FC<LinkProps> = (props) => {
    return <Link href={Routes.ADMIN_SETTINGS_ADD} {...props} />;
};

export const LinkBareProducts: FC<LinkProps> = (props) => {
    return <Link href={Routes.ADMIN_PRODUCT} {...props} />;
};

export const LinkBareProduct: FC<LinkProps & AdditionalProps> = ({
    id,
    ...props
}) => {
    return <Link href={`${Routes.ADMIN_PRODUCT}/${id}`} {...props} />;
};

export const LinkBareProductCreate: FC<LinkProps> = (props) => {
    return <Link href={Routes.ADMIN_PRODUCT_CREATE} {...props} />;
};

export const LinkBareCategories: FC<LinkProps> = (props) => {
    return <Link href={Routes.ADMIN_CATEGORY} {...props} />;
};

export const LinkBareCategory: FC<LinkProps & AdditionalProps> = ({
    id,
    ...props
}) => {
    return <Link href={`${Routes.ADMIN_CATEGORY}/${id}`} {...props} />;
};

export const LinkBareSites: FC<LinkProps> = (props) => {
    return <Link href={Routes.ADMIN_SITE} {...props} />;
};

export const LinkBareSite: FC<LinkProps & AdditionalProps> = ({
    id,
    ...props
}) => {
    return <Link href={`${Routes.ADMIN_SITE}/${id}`} {...props} />;
};

export const LinkBareSiteCreate: FC<LinkProps> = (props) => {
    return <Link href={Routes.ADMIN_SITE_CREATE} {...props} />;
};

export const LinkBareOrders: FC<LinkProps> = (props) => {
    return <Link href={Routes.ADMIN_ORDER} {...props} />;
};

export const LinkBareOrder: FC<LinkProps & AdditionalProps> = ({
    id,
    ...props
}) => {
    return <Link href={`${Routes.ADMIN_ORDER}/${id}`} {...props} />;
};
