import { ProductPage } from '@/client/pages/site/pages';
import { getProductByParams } from '@/commerce/shop/admin/backend';

export default async function Product({
    params,
}: {
    params: { slug: string[] };
}) {
    const resp = await getProductByParams({
        url: decodeURI(params.slug.join('/')),
    });

    const [product] = resp.data;

    return <ProductPage product={product} />;
}
