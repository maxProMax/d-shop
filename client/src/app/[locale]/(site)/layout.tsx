import { ReactNode } from 'react';
import { getSite, getCategoryTree } from '@/commerce/shop/admin/backend';
import { SITE_ID } from '@/constants';
import { Category } from '@/commerce/shop/admin/types';
import { Header } from '@/client/pages/site/Header';
import { ContentLayout, RootLayout } from '@/client/pages/site/layout';
import { UserProvider } from '@/client/modules/customer/user';
import { Footer } from '@/client/pages/site/Footer';
import { ThemeProviderStorefront } from '@/client/modules/mui/storefont';

export default async function Layout({ children }: { children: ReactNode }) {
    if (typeof SITE_ID !== 'string') {
        throw new Error('no SITE_ID');
    }

    const { data: site } = await getSite(SITE_ID);
    let category: Category | undefined = undefined;

    if (site.navigation) {
        const resp = await getCategoryTree(site.navigation?.id);
        category = resp.data;
    }

    return (
        <ThemeProviderStorefront>
            <UserProvider>
                <RootLayout>
                    <Header site={site} category={category} />
                    <ContentLayout>{children}</ContentLayout>
                    <Footer />
                </RootLayout>
            </UserProvider>
        </ThemeProviderStorefront>
    );
}
