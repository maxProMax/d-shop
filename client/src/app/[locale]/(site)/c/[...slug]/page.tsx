import { CategoryPage } from '@/client/pages/site/pages';
import { getCategoryByParams } from '@/commerce/shop/admin/backend';
import { notFound } from 'next/navigation';

export default async function Category({
    params,
}: {
    params: { slug: string[] };
}) {
    const resp = await getCategoryByParams({
        url: decodeURI(params.slug.join('/')),
    });

    const [category] = resp.data;

    if (!category) {
        notFound();
    }

    return <CategoryPage category={category} />;
}
