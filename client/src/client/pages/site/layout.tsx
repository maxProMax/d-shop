'use client';
import { FC, PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.rootLayout}>{children}</div>;
};
