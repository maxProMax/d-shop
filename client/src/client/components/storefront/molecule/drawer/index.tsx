import { FC, PropsWithChildren, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MuiDrawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import styles from './styles.module.css';

export const Drawer: FC<
    PropsWithChildren<{
        open: boolean;
        toggle: (f: boolean) => void;
    }>
> = ({ open, toggle, children }) => {
    const pathname = usePathname();

    useEffect(() => {
        toggle(false);
    }, [pathname]);

    return (
        <MuiDrawer anchor="right" open={open} onClose={() => toggle(false)}>
            <div className={styles.content}>
                <div className={styles.head}>
                    <span onClick={() => toggle(false)}>
                        <CloseIcon />
                    </span>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </MuiDrawer>
    );
};
