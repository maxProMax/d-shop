import { getCategoryTrees } from '@/commerce/shop/admin/client';
import { Category } from '@/commerce/shop/admin/types';
import { useEffect, useState } from 'react';

export const useCategories = () => {
    const [state, updateState] = useState<{
        categories: Category[];
        loading: boolean;
    }>({
        categories: [],
        loading: true,
    });
    useEffect(() => {
        getCategoryTrees().then(({ data: categories }) =>
            updateState({ categories, loading: false })
        );
    }, []);

    return state;
};
