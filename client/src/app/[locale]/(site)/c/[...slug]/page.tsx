import { CategoryPage } from '@/client/pages/site/pages';
import { getCategoryByParams } from '@/commerce/shop/admin/backend';

export default async function Category({
    params,
}: {
    params: { slug: string[] };
}) {
    const resp = await getCategoryByParams({
        url: decodeURI(params.slug.join('/')),
    });

    const [category] = resp.data;

    return <CategoryPage category={category} />;
}
