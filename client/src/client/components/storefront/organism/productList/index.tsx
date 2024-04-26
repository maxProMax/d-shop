import { FC } from 'react';
import { Product } from '@/commerce/shop/admin/types';
import { Tile } from '../tile';
import styles from './styles.module.css';

export const ProductList: FC<{ products?: Product[] }> = ({
    products = [],
}) => {
    return (
        <section className={styles.grid}>
            {products?.map((product) => (
                <article key={product.id}>
                    <Tile product={product}></Tile>
                </article>
            ))}
        </section>
    );
};
