import { FC, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import { LogoutBtn } from '@/client/components/admin/molecules/logout';
import { SideBar } from './SideBar';
import styles from './styles.module.css';

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <header className={styles.header}>
                <Box
                    bgcolor={'primary.main'}
                    color={'primary.contrastText'}
                    p={2}
                >
                    <Box
                        maxWidth={1280}
                        margin={'auto'}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        Admin Panel
                        <LogoutBtn />
                    </Box>
                </Box>
            </header>
            <div className={styles.page}>
                <SideBar />
                <main>{children}</main>
            </div>
        </div>
    );
};
