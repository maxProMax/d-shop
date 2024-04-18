import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { PageWrapper } from '@/client/components/admin/atoms/layout';

export const ProductsPage: FC<{ products: any[] }> = () => {
    const t = useTranslations('admin');

    return <PageWrapper>ProductsPage</PageWrapper>;
};
