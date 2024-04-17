import createMiddleware from 'next-intl/middleware';
import { LOCALES, DEFAULT_LOCALE } from './constants';

export default createMiddleware({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE as string,
    localePrefix: 'as-needed',
});

export const config = {
    matcher: ['/((?!_next).*)'],
};
