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
    url?: string;
    children: Category[];
    products?: Product[];
};

export type Product = {
    id: string;
    name: string;
};

export interface Site {
    id: string;
    siteName: string;
    navigation?: Category;
    logo?: Image;
}

export interface SiteForm {
    id?: string;
    siteName: string;
    navigation?: string;
    file?: Blob;
}

export type Image = {
    id: string;
    originalname: string;
    mimetype: string;
    path: string;
    size: number;
};
