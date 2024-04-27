export enum Routes {
    HOME = '/',
    CATEGORY = '/c',
    PRODUCT = '/p',
    CART = '/cart',
    CHECKOUT_SUCCESS = '/checkout/success',
}

export const RoutesDynamic = {
    checkoutSuccess: (orderId: string) => `/checkout/success?id=${orderId}`,
};
