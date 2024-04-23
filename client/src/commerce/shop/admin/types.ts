export type AdminUser = {
    id: number;
    firstName: string;
    lastName: string;
    type: string;
    email: string;
    password: string;
};

export type Category = {
    id: string;
    name: string;
    description?: string;
    url?: string;
    children: Category[];
    products?: Product[];
    banner?: Image;
};

export type CategoryForm = {
    name: string;
    description?: string;
    url?: string;
    file?: Blob;
};

export type Product = {
    id: string;
    name: string;
    url?: string;
    price?: Price;
};

export type AdminProduct = {
    id: string;
    name: string;
    url?: string;
    prices?: Price[];
};

export interface Site {
    id: string;
    siteName: string;
    navigation?: Category;
    currency?: Currency;
    logo?: Image;
}

export interface SiteForm {
    id?: string;
    siteName: string;
    navigation?: string;
    currency?: string;
    file?: Blob;
}

export type Image = {
    id: string;
    originalname: string;
    mimetype: string;
    path: string;
    size: number;
};

export type Cart = {
    currency: Currency;
    items: { id: string; amount: number; product: Product }[];
    total: number;
};

export type Currency = {
    id: string;
    code: string;
    symbol: string;
};

export type Price = {
    id?: string;
    price?: number;
    discountPrice?: number;
    currency?: Currency;
};

export type PriceForm = {
    price?: number;
    discountPrice?: number;
    currency?: string;
};
