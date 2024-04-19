'use client';
import { FC, PropsWithChildren, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Category } from '@/commerce/shop/admin/types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Routes, RoutesDynamic } from '@/client/modules/router/admin/routes';
import { TextButton } from '@/client/components/admin/atoms/button';
import CategoryIcon from '@mui/icons-material/Category';
import styles from './styles.module.css';

export const CategoriesPage: FC = () => {
    return (
        <div className={styles.mainPage}>
            <CategoryIcon />
        </div>
    );
};
