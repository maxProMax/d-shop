import { FC, PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const AdminRootLayout: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.layout}>{children}</div>;
};
