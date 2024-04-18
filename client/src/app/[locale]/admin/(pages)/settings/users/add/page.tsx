import { UserPage } from '@/client/pages/Admin/settings/User';
import { getSessionCookie } from '@/backend/cookies';
import { getAdminUser } from '@/commerce/shop/admin/backend';

export default async function AddUser() {
    // const resp = await getAdminUser(getSessionCookie(), params.id);

    return <UserPage />;
}
