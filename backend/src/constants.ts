import 'dotenv/config';

export const STATIC_ROOT_DIR = 'uploads';
export const SERVER_ROOT_DIR = 'public';

/**
 * seconds
 */
export const SESSION_TTL = 60 * 10;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_CART_DB_IDX = process.env.REDIS_CART_DB_IDX;
export const REDIS_SESSION_DB_IDX = process.env.REDIS_SESSION_DB_IDX;
