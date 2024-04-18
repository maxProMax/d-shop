'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import { Category } from '@/commerce/shop/admin/types';

export const CategoriesPage: FC<{ categories: Category[] }> = ({
    categories,
}) => {
    const t = useTranslations('admin');

    return (
        <PageWrapper>
            <Box sx={{ height: 220, flexGrow: 1, maxWidth: 400 }}>
                <SimpleTreeView>
                    {categories.map((category) => (
                        <TreeItem
                            key={category.id}
                            itemId={category.id}
                            label={category.name}
                        ></TreeItem>
                    ))}
                    {/* <TreeItem itemId="grid" label="Data Grid">
                        <TreeItem
                            itemId="grid-community"
                            label="@mui/x-data-grid"
                        />
                        <TreeItem
                            itemId="grid-pro"
                            label="@mui/x-data-grid-pro"
                        />
                        <TreeItem
                            itemId="grid-premium"
                            label="@mui/x-data-grid-premium"
                        />
                    </TreeItem> */}
                    {/* <TreeItem itemId="pickers" label="Date and Time Pickers">
                        <TreeItem
                            itemId="pickers-community"
                            label="@mui/x-date-pickers"
                        />
                        <TreeItem
                            itemId="pickers-pro"
                            label="@mui/x-date-pickers-pro"
                        />
                    </TreeItem> */}
                </SimpleTreeView>
            </Box>
        </PageWrapper>
    );
};
