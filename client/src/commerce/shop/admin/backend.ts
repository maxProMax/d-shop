import axios from 'axios';
import { BACKEND_HREF, SITE_ID } from '@/constants';
import {
    AdminProduct,
    AdminUser,
    Category,
    Currency,
    Order,
    Product,
    Site,
} from './types';

const api = axios.create({
    baseURL: BACKEND_HREF,
    headers: { 'Content-Type': 'application/json', 'x-shop-id': SITE_ID },
});

const authorizedGet = <T>(path: string, cookies: string) => {
    return api.get<T>(path, {
        headers: {
            Cookie: cookies,
        },
    });
};

export const statusCheck = (cookies: string) => {
    return authorizedGet<{ isValid: boolean }>('admin/check', cookies);
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

export const getCategoryTrees = () => {
    return api.get<Category[]>('category/trees');
};

export const getCategory = (id: string) => {
    return api.get<Category>(`category/${id}`);
};

export const getCategoryByParams = (params: { url?: string }) => {
    return api.get<Category[]>(`category/search`, { params });
};

export const getCategoryTree = (id: string) => {
    return api.get<Category>(`category/${id}/tree`);
};

export const getProducts = () => {
    return api.get<Product[]>('product');
};

export const getStorefrontProducts = () => {
    return api.get<Product[]>('product/storefront/all');
};

export const getProduct = (id: string) => {
    return api.get<AdminProduct>(`product/${id}`);
};

export const getProductByParams = (params: { url?: string }) => {
    return api.get<Product[]>(`product/storefront/search`, { params });
};

export const getSites = (cookies: string) => {
    return authorizedGet<Site[]>('site', cookies);
};

export const getSite = (id: string) => {
    return api.get<Site>(`site/${id}`);
};

export const getCurrencies = () => {
    return api.get<Currency[]>(`currency`);
};

export const getCheckoutAllOrders = (cookies: string) => {
    return authorizedGet<Order[]>(`/checkout/all-orders`, cookies);
};

export const getCheckoutOrder = (id: string, cookies: string) => {
    return authorizedGet<Order>(`/checkout/order/${id}`, cookies);
};
