import { CategoriesLayout } from '@/client/pages/Admin/categories';
import { getCategories } from '@/commerce/shop/admin/backend';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
    try {
        const resp = await getCategories();

        return (
            <CategoriesLayout categories={resp.data}>
                {children}
            </CategoriesLayout>
        );
    } catch (error) {
        notFound();
    }
}
