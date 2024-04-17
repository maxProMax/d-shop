import { FC } from 'react';
import { Routes } from './routes';
import { Link, LinkProps } from '@/client/components/atoms/link';

export const LinkBareSettings: FC<Omit<LinkProps, 'href'>> = (props) => {
    return <Link href={Routes.ADMIN_SETTINGS} {...props} />;
};

export const LinkBareAdminUser: FC<
    Omit<LinkProps, 'href'> & { id: string | number }
> = ({ id, ...props }) => {
    return <Link href={`${Routes.ADMIN_SETTINGS_USER}/${id}`} {...props} />;
};

export const LinkBareSettingsUsers: FC<Omit<LinkProps, 'href'>> = (props) => {
    return <Link href={Routes.ADMIN_SETTINGS_USERS} {...props} />;
};

export const LinkBareAddAdminUser: FC<Omit<LinkProps, 'href'>> = (props) => {
    return <Link href={Routes.ADMIN_SETTINGS_ADD} {...props} />;
};
