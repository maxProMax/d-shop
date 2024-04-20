import { CategoriesLayout } from '@/client/pages/admin/Admin/categories';
import { getCategoryTrees } from '@/commerce/shop/admin/backend';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
    try {
        const resp = await getCategoryTrees();

        return (
            <CategoriesLayout categories={resp.data}>
                {children}
            </CategoriesLayout>
        );
    } catch (error) {
        notFound();
    }
}
