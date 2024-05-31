import { SitePage } from '@/client/pages/admin/Admin/sites';
import { getSite, getCurrencies } from '@/commerce/shop/admin/backend';

export default async function UpdateSite({
    params,
}: {
    params: { id: string };
}) {
    const { data: site } = await getSite(params.id);
    const { data: currencies } = await getCurrencies();

    return <SitePage site={site} currencies={currencies} />;
}
