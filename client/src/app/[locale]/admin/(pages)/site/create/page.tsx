import { SitePage } from '@/client/pages/admin/Admin/sites';
import { getCurrencies } from '@/commerce/shop/admin/backend';

export default async function Products() {
    const { data: currencies } = await getCurrencies();

    return <SitePage currencies={currencies} />;
}
