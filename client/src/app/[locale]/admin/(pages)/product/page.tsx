import { ProductsPage } from '@/client/pages/admin/Admin/products';
import { getProducts } from '@/commerce/shop/admin/backend';

export default async function ProductsList() {
    const resp = await getProducts();

    return <ProductsPage products={resp.data} />;
}
