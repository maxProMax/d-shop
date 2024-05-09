import 'dotenv/config';

export const STATIC_ROOT_DIR = 'uploads';
export const SERVER_ROOT_DIR = 'public';
export const SHOP_ID_HEADER = 'x-shop-id';

/**
 * seconds
 */
export const SESSION_TTL = 60 * 30;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_CART_DB_IDX = process.env.REDIS_CART_DB_IDX;
export const REDIS_SESSION_DB_IDX = process.env.REDIS_SESSION_DB_IDX;

export const SMTPS_USER = process.env.SMTPS_USER;
export const SMTPS_PASS = process.env.SMTPS_PASS;
export const SMTPS_DOMAIN = process.env.SMTPS_DOMAIN;
export const SMTPS_PORT = process.env.SMTPS_PORT;
