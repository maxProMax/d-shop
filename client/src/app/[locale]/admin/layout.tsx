import { ReactNode } from 'react';
import { ThemeProviderAdmin } from '@/client/modules/mui/admin';
import { AdminRootLayout } from '@/client/pages/admin/layout';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <ThemeProviderAdmin>
            <AdminRootLayout>{children}</AdminRootLayout>
        </ThemeProviderAdmin>
    );
}
