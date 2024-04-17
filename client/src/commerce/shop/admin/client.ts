import axios from 'axios';

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
