import { HomePage } from '@/client/pages/site/page';
import { getStorefrontProducts } from '@/commerce/shop/admin/backend';

export default async function Home() {
    const { data: products } = await getStorefrontProducts();

    return <HomePage products={products} />;
}
