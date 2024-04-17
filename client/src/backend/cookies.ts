import { cookies } from 'next/headers';

export const getSessionCookie = () => {
    const cookieStore = cookies();
    const SESSION_COOKIE_NAME = 'connect.sid';
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    return `${sessionCookie?.name}=${sessionCookie?.value}`;
};
