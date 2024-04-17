import { FC } from 'react';
import Box from '@mui/material/Box';
import { SideBar } from './SideBar';
import styles from './styles.module.css';

export const AdminPage: FC = () => {
    return <div>Content</div>;
    // return (
    //     <div>
    //         <header>
    //             <Box
    //                 bgcolor={'primary.main'}
    //                 color={'primary.contrastText'}
    //                 p={2}
    //             >
    //                 Admin Panel
    //             </Box>
    //         </header>
    //         <main className={styles.page}>
    //             <SideBar />
    //             <div>Content</div>
    //         </main>
    //     </div>
    // );
};
