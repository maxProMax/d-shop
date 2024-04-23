import { useContext } from 'react';
import { UserContext } from '.';
import { useFetch } from '../network';
import { putCart } from '@/commerce/shop/admin/client';

export const useUser = () => {
    return useContext(UserContext);
};

export const useAddToCart = () => {
    const { updateCart } = useContext(UserContext);

    const { loading, request } = useFetch(putCart);

    return {
        loading,
        request: async (product_id: string) => {
            const { data: cart } = await request(product_id);

            updateCart?.(cart);
        },
    };
};
