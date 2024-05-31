import { UsersPage } from '@/client/pages/admin/Admin/settings/Users';
import { getAdminUsers } from '@/commerce/shop/admin/backend';
import { getSessionCookie } from '@/backend/cookies';

export default async function Users() {
    const resp = await getAdminUsers(getSessionCookie());

    return <UsersPage users={resp.data} />;
}
