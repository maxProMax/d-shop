'use client';
import { FC } from 'react';
import { useParams } from 'next/navigation';
import { Image } from '@/client/components/common/image';
import { Category } from '@/commerce/shop/admin/types';
import { LinkProduct } from '@/client/modules/router/client/links';

export const CategoryPage: FC<{ category: Category }> = ({ category }) => {
    console.log(category);

    return (
        <div>
            <h3> Category - {category.name}</h3>
            {category.banner && <Image src={category.banner?.path} />}
            {category.description && <p>{category.description}</p>}
            <ul>
                {category.products?.map((product) => (
                    <li key={product.id}>
                        <LinkProduct slug={product.url}>
                            {product.name} {product.price?.price}{' '}
                            {product.price?.currency?.symbol}
                        </LinkProduct>
                    </li>
                ))}
            </ul>
        </div>
    );
};
