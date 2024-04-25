'use client';
import { FC, PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.contentLayout}>{children}</div>;
};

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.rootLayout}>{children}</div>;
};
