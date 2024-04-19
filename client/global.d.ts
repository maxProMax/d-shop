import ua from './locales/uk-UA.json';

type Messages = typeof ua;

declare global {
    // Use type safe message keys with `next-intl`
    interface IntlMessages extends Messages {}
}
