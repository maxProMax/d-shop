import axios from 'axios';
import {
    AddressForm,
    AdminProductForm,
    Cart,
    Category,
    CategoryForm,
    PriceForm,
    Product,
    SiteForm,
} from './types';
import { SITE_ID } from '@/constants';

type User = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
};

const api = axios.create({
    baseURL: '/backend/',
    headers: { 'Content-Type': 'application/json', 'x-shop-id': SITE_ID },
});

const multipartOptions = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
};

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

export const createCategory = (category: CategoryForm) => {
    return api.post<{ id: string }>(`category`, category, multipartOptions);
};

export const createSubcategory = (id: string, category: CategoryForm) => {
    return api.post<{ id: string }>(
        `category/${id}/sub-category`,
        category,
        multipartOptions
    );
};

export const updateCategory = (id: string, category: CategoryForm) => {
    return api.put<{ id: string }>(
        `category/${id}`,
        category,
        multipartOptions
    );
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
    return api.post<{ id: string }>('site', site, multipartOptions);
};

export const updateSite = (id: number | string, site: SiteForm) => {
    return api.put(`site/${id}`, site, multipartOptions);
};

export const deleteSite = (id: string) => {
    return api.delete(`site/${id}`);
};

export const createProduct = (product: AdminProductForm) => {
    return api.post<{ id: string }>(`product`, product, multipartOptions);
};

export const createProductPrice = (id: string, price: PriceForm) => {
    return api.post<{ id: string }>(`product/${id}`, price);
};

export const updateProduct = (id: string, product: AdminProductForm) => {
    return api.put<{ id: string }>(`product/${id}`, product, multipartOptions);
};

export const deleteProduct = (id: string) => {
    return api.delete<{ id: string }>(`product/${id}`);
};

export const userLoginGuest = () => {
    return api.post(`customer/login/guest`);
};

export const userCheck = () => {
    return api.get<{ isLoggedIn: boolean }>(`customer/check`);
};

export const getCart = () => {
    return api.get<Cart>(`cart`);
};

export const putCart = (product_id: string) => {
    return api.put<Cart>(`cart`, { product_id });
};

export const checkout = (body: AddressForm) => {
    return api.post<{ orderId: string }>(`checkout/guest`, body);
};

export const orderAddressCreate = (id: string, body: AddressForm) => {
    return api.put(`checkout/order/${id}`, body);
};

export const addressUpdate = (id: string, body: AddressForm) => {
    return api.put(`address/${id}`, body);
};
