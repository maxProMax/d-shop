export enum Routes {
    ADMIN = '/admin',
    ADMIN_LOGIN = '/admin/login',
    ADMIN_SETTINGS = '/admin/settings',
    ADMIN_SETTINGS_USERS = '/admin/settings/users',
    ADMIN_SETTINGS_USER = '/admin/settings/users',
    ADMIN_SETTINGS_ADD = '/admin/settings/users/add',
    ADMIN_CATEGORY = '/admin/category',
    ADMIN_CATEGORY_CREATE = '/admin/category/create',
    ADMIN_SITE = '/admin/site',
    ADMIN_SITE_CREATE = '/admin/site/create',
    ADMIN_PRODUCT = '/admin/product',
    ADMIN_PRODUCT_CREATE = '/admin/product/create',
}

export const RoutesDynamic = {
    adminCategoryCreate: (id: string) => `/admin/category/${id}/create`,
    adminCategoryEdit: (id: string) => `/admin/category/${id}`,
    adminProductEdit: (id: string) => `/admin/product/${id}`,
};
