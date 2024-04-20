import { ReactNode } from 'react';
import { getSite, getCategoryTree } from '@/commerce/shop/admin/backend';
import { SITE_ID } from '@/constants';
import { Category } from '@/commerce/shop/admin/types';
import { Image } from '@/client/components/common/image';
import { Header } from '@/client/pages/site/Header';

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

    // console.log({ site, category });

    return (
        <main>
            <Header site={site} category={category} />
            {children}
            <footer>
                <nav>
                    <ul>
                        <li>Footer Nav 1</li>
                    </ul>
                </nav>
            </footer>
        </main>
    );
}
