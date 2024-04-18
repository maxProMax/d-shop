import { FC, PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};
