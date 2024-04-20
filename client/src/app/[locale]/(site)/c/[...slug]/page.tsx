// getCategoryByParams

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

    console.log({ category });

    return (
        <div>
            <h3> Category - {category.name}</h3>
            <ul>
                {category.products?.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
}
