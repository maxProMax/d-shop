import { SitesPage } from '@/client/pages/admin/Admin/sites';
import { getSites } from '@/commerce/shop/admin/backend';
import { getSessionCookie } from '@/backend/cookies';

export default async function Sites() {
    const resp = await getSites(getSessionCookie());

    return <SitesPage sites={resp.data} />;
}
