import axios from 'axios';
import { BACKEND_HREF } from '@/constants';
import { AdminUser, Category, Site } from './types';

const api = axios.create({
    baseURL: BACKEND_HREF,
    headers: { 'Content-Type': 'application/json' },
});

const authorizedGet = <T>(path: string, cookies: string) => {
    return api.get<T>(path, {
        headers: {
            Cookie: cookies,
        },
    });
};

export const statusCheck = (cookies: string) => {
    return api.get<{ isValid: boolean }>('admin/check', {
        headers: {
            Cookie: cookies,
        },
    });
};

export const getAdminUsers = (cookies: string) => {
    return api.get<AdminUser[]>('admin/users', {
        headers: {
            Cookie: cookies,
        },
    });
};

export const getAdminUser = (cookies: string, id: number) => {
    return api.get<AdminUser>(`admin/users/${id}`, {
        headers: {
            Cookie: cookies,
        },
    });
};

export const getCategories = () => {
    return api.get<Category[]>('category');
};

export const getSites = (cookies: string) => {
    return authorizedGet<Site[]>('site', cookies);
};

export const getSite = (id: number, cookies: string) => {
    return authorizedGet<Site>(`site/${id}`, cookies);
};
