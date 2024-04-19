import { getCategory } from '@/commerce/shop/admin/backend';
import { CategoryPage } from '@/client/pages/Admin/categories';

export default async function Category({ params }: { params: { id: string } }) {
    const resp = await getCategory(params.id);

    return <CategoryPage parentCategory={resp.data} type="create-sub" />;
}
