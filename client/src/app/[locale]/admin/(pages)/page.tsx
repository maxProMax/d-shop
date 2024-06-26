import { AdminPage } from '@/client/pages/admin/Admin';
import { getCheckoutAllOrders } from '@/commerce/shop/admin/backend';
import { getSessionCookie } from '@/backend/cookies';

export default async function Admin() {
    const { data: orders } = await getCheckoutAllOrders(getSessionCookie());

    return <AdminPage orders={orders} />;
}
