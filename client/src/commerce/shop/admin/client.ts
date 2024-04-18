import axios from 'axios';
import { Site } from './types';

type User = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
};

const api = axios.create({
    baseURL: '/backend/',
    headers: { 'Content-Type': 'application/json' },
});

export const login = ({ email, password }: User) => {
    return api.post('admin/login', { email, password });
};

export const logout = () => {
    return api.get('admin/logout');
};

export const updateAdminUser = (id: number, { firstName, lastName }: User) => {
    return api.put(`admin/users/${id}`, { firstName, lastName });
};

export const createAdminUser = (user: User) => {
    return api.post(`admin/registration`, user);
};

export const deleteAdminUser = (id: number) => {
    return api.delete(`admin/users/${id}`);
};

export const createSite = (site: Omit<Site, 'logo'> & { file?: Blob }) => {
    return api.post('site', site, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteSite = (id: string) => {
    return api.delete(`site/${id}`);
};
