import { SitePage } from '@/client/pages/Admin/sites';
import { getSite } from '@/commerce/shop/admin/backend';
import { getSessionCookie } from '@/backend/cookies';

export default async function Site({ params }: { params: { id: number } }) {
    const resp = await getSite(params.id, getSessionCookie());

    return <SitePage site={resp.data} />;
}
