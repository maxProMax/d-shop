'use client';
import { FC, PropsWithChildren, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Category } from '@/commerce/shop/admin/types';
import { PageWrapper } from '@/client/components/admin/atoms/layout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Routes, RoutesDynamic } from '@/client/modules/router/admin/routes';
import { ContainedButton } from '@/client/components/admin/atoms/button';
import styles from './styles.module.css';

const Tree: FC<{ trees: Category[]; level?: number }> = ({
    trees,
    level = 0,
}) => {
    const router = useRouter();
    const handleClick = (
        e: SyntheticEvent<HTMLSpanElement>,
        id: string,
        isCreate = false
    ) => {
        router.push(
            isCreate
                ? RoutesDynamic.adminCategoryCreate(id)
                : `${Routes.ADMIN_CATEGORY}/${id}`
        );

        e.stopPropagation();
    };

    return (
        <>
            {trees.map((tree) => (
                <TreeItem
                    key={tree.id}
                    itemId={tree.id}
                    label={
                        <div className={styles.treeName}>
                            <span onClick={(e) => handleClick(e, tree.id)}>
                                {tree.name}
                            </span>
                            {level < 2 && (
                                <span
                                    className={styles.icon}
                                    onClick={(e) =>
                                        handleClick(e, tree.id, true)
                                    }
                                >
                                    <MoreVertIcon />
                                </span>
                            )}
                        </div>
                    }
                >
                    {!!tree.children.length && (
                        <Tree level={level + 1} trees={tree.children} />
                    )}
                </TreeItem>
            ))}
        </>
    );
};

interface IProps extends PropsWithChildren {
    categories: Category[];
}

export const CategoriesLayout: FC<IProps> = ({ categories, children }) => {
    const t = useTranslations('admin');
    const router = useRouter();
    const handleClickCreate = (e: SyntheticEvent<HTMLSpanElement>) => {
        router.push(Routes.ADMIN_CATEGORY_CREATE);
    };

    return (
        <PageWrapper>
            <div className={styles.wrapper}>
                <Box
                    sx={{
                        flexGrow: 1,
                        width: 200,
                        flexShrink: 0,
                    }}
                >
                    <ContainedButton onClick={handleClickCreate} size="small">
                        {t('form.buttons.create')}
                    </ContainedButton>
                    <SimpleTreeView>
                        <Tree trees={categories} />
                    </SimpleTreeView>
                </Box>
                {children}
            </div>
        </PageWrapper>
    );
};
