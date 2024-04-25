import { FC } from 'react';
import { Product } from '@/commerce/shop/admin/types';
import { Tile } from '../tile';
import styles from './styles.module.css';

export const ProductList: FC<{ products?: Product[] }> = ({
    products = [],
}) => {
    return (
        <ul className={styles.grid}>
            {products?.map((product) => (
                <li key={product.id}>
                    <Tile product={product}></Tile>
                </li>
            ))}
        </ul>
    );
};
