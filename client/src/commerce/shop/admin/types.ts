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
};

export type Site = {
    id?: string;
    siteName: string;
    logo?: Image;
};

export type Image = {
    id: string;
    originalname: string;
    mimetype: string;
    path: string;
    size: number;
};
