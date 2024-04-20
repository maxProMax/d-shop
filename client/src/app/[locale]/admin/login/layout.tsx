import { PageLayout } from '@/client/pages/admin/Login/Layout';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return <PageLayout>{children}</PageLayout>;
}
