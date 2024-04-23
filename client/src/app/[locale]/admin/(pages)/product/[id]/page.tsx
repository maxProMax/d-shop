import { ProductPage } from '@/client/pages/admin/Admin/products';
import { getProduct, getCurrencies } from '@/commerce/shop/admin/backend';

export default async function Products({ params }: { params: { id: string } }) {
    const { data: product } = await getProduct(params.id);
    const { data: currencies } = await getCurrencies();

    return <ProductPage product={product} currencies={currencies} />;
}
