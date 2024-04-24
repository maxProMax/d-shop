import { OrdersPage } from '@/client/pages/admin/Admin/orders';
import { getCheckoutAllOrders } from '@/commerce/shop/admin/backend';
import { getSessionCookie } from '@/backend/cookies';

export default async function Orders() {
    const { data: orders } = await getCheckoutAllOrders(getSessionCookie());
    return <OrdersPage orders={orders} />;
}
