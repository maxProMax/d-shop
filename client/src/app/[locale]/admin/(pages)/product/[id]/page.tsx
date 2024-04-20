import { ProductPage } from '@/client/pages/admin/Admin/products';
import { getProduct } from '@/commerce/shop/admin/backend';

export default async function Products({ params }: { params: { id: string } }) {
    const resp = await getProduct(params.id);

    return <ProductPage product={resp.data} />;
}
