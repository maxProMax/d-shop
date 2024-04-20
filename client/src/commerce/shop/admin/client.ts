import axios from 'axios';
import { Category, Product, Site, SiteForm } from './types';

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

export const getCategoryTrees = () => {
    return api.get<Category[]>(`category/trees`);
};

export const createCategory = (category: Category) => {
    return api.post<{ id: string }>(`category`, category);
};

export const createSubcategory = (id: string, category: Category) => {
    return api.post<{ id: string }>(`category/${id}/sub-category`, category);
};

export const updateCategory = (id: string, category: Category) => {
    return api.put<{ id: string }>(`category/${id}`, category);
};

export const deleteCategory = (id: string) => {
    return api.delete(`category/${id}`);
};

export const addProductToCategory = (id: string, product_id: string) => {
    return api.put(`category/${id}/product`, { product_id });
};

export const deleteProductFromCategory = (id: string, product_id: string) => {
    return api.delete(`category/${id}/product/${product_id}`);
};

export const createSite = (site: SiteForm) => {
    return api.post<{ id: string }>('site', site, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const updateSite = (id: number | string, site: SiteForm) => {
    return api.put(`site/${id}`, site, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteSite = (id: string) => {
    return api.delete(`site/${id}`);
};

export const createProduct = (product: Product) => {
    return api.post<{ id: string }>(`product`, product);
};

export const updateProduct = (id: string, product: Product) => {
    return api.put<{ id: string }>(`product/${id}`, product);
};

export const deleteProduct = (id: string) => {
    return api.delete<{ id: string }>(`product/${id}`);
};
