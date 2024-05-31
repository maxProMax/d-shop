import { OrderPage } from '@/client/pages/admin/Admin/orders';
import { getCheckoutOrder } from '@/commerce/shop/admin/backend';
import { getSessionCookie } from '@/backend/cookies';

export default async function OrderDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const { data: order } = await getCheckoutOrder(
        params.id,
        getSessionCookie()
    );
    return <OrderPage order={order} />;
}
