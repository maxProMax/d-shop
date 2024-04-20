import { getCategory, getProducts } from '@/commerce/shop/admin/backend';
import { CategoryPage } from '@/client/pages/admin/Admin/categories';

export default async function Category({ params }: { params: { id: string } }) {
    const { data: category } = await getCategory(params.id);
    const { data: products } = await getProducts();

    return <CategoryPage type="edit" products={products} category={category} />;
}
