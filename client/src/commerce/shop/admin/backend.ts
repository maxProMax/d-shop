import axios from 'axios';
import { BACKEND_HREF } from '@/constants';
import { AdminUser } from './types';

const api = axios.create({
    baseURL: BACKEND_HREF,
    headers: { 'Content-Type': 'application/json' },
});

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
