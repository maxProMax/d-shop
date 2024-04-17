import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { statusCheck } from '@/commerce/shop/admin/backend';
import { getSessionCookie } from '@/backend/cookies';
import { AdminLayout } from '@/client/pages/Admin/Layout';
import { Routes } from '@/client/modules/router/admin/routes';

export default async function Layout({ children }: { children: ReactNode }) {
    try {
        const resp = await statusCheck(getSessionCookie());

        return resp.data.isValid ? (
            <AdminLayout>{children}</AdminLayout>
        ) : (
            redirect(Routes.ADMIN_LOGIN)
        );
    } catch (error) {
        redirect(Routes.ADMIN_LOGIN);
    }
}
