import { FC, SyntheticEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { LinkProduct } from '@/client/modules/router/storefront/links';
import { Price as PriceType, Product } from '@/commerce/shop/admin/types';
import { Image } from '@/client/components/common/image';
import { useAddToCart } from '@/client/modules/customer/user';
import styles from './styles.module.css';
import clsx from 'clsx';

const Price: FC<{ price: PriceType }> = ({ price }) => {
    return <span>{`${price?.price} ${price?.currency?.symbol}`}</span>;
};

export const Tile: FC<{ product: Product }> = ({ product }) => {
    const { request, loading } = useAddToCart();
    const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
        request(product.id);
        e.stopPropagation();
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <LinkProduct className={styles.tile} slug={product.url}>
                {product.image?.path && (
                    <Image className={styles.image} src={product.image?.path} />
                )}
                <h5>{product.name}</h5>
            </LinkProduct>
            <div className={styles.footer}>
                {product.price && <Price price={product.price} />}
                <button
                    disabled={loading}
                    onClick={handleClick}
                    className={styles.button}
                    type="button"
                >
                    <AddIcon />
                </button>
            </div>
        </div>
    );
};
