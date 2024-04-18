import { CategoriesPage } from '@/client/pages/Admin/categories';
import { getCategories } from '@/commerce/shop/admin/backend';
import { notFound } from 'next/navigation';

export default async function Categories() {
    try {
        const resp = await getCategories();

        return <CategoriesPage categories={resp.data} />;
    } catch (error) {
        notFound();
    }
}
