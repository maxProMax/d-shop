import { UsersPage } from '@/client/pages/Admin/settings/Users';
import { getAdminUsers } from '@/commerce/shop/admin/backend';
import { getSessionCookie } from '@/backend/cookies';

export default async function Settings() {
    const resp = await getAdminUsers(getSessionCookie());

    return <UsersPage users={resp.data} />;
}
