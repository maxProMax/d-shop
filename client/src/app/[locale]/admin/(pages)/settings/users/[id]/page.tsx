import { notFound } from 'next/navigation';
import {
    UserPage,
    UserPageNotFound,
} from '@/client/pages/admin/Admin/settings/User';
import { getSessionCookie } from '@/backend/cookies';
import { getAdminUser } from '@/commerce/shop/admin/backend';

export default async function User({ params }: { params: { id: number } }) {
    try {
        const resp = await getAdminUser(getSessionCookie(), params.id);

        return <UserPage user={resp.data} />;
    } catch {
        return <UserPageNotFound />;
    }
}
