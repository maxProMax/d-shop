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
    description?: string;
    url?: string;
    price?: Price;
    image?: Image;
};

export type AdminProduct = {
    id: string;
    name: string;
    description?: string;
    url?: string;
    prices?: Price[];
    image?: Image;
};

export type AdminProductForm = {
    name: string;
    description?: string;
    url?: string;
    file?: Blob;
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

export type OrderDetails = {
    id?: string;
    orderId?: string;
    currency?: Currency;
    price?: number;
    amount?: number;
    product?: Product;
};

export type Order = {
    id?: string;
    createdDate?: string;
    userType?: string;
    total?: number;
    currency: Currency;
    orderDetails?: OrderDetails[];
};
