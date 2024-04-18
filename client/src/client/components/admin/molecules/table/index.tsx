import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './styles.module.css';

type IProps = {
    table: { head: string[]; body: (string | number | ReactNode)[][] };
};

export const Table: FC<IProps> = ({ table }) => {
    return (
        <TableContainer component={Paper} classes={{ root: styles.table }}>
            <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {table.head.map((v, i, l) => (
                            <TableCell
                                key={i}
                                align={i === l.length - 1 ? 'right' : 'left'}
                            >
                                {v}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {table.body.map((row, i) => (
                        <TableRow key={i}>
                            {row.map((col, j, l) => (
                                <TableCell
                                    key={j}
                                    align={
                                        j === l.length - 1 ? 'right' : 'left'
                                    }
                                    component="th"
                                    scope="row"
                                >
                                    {col}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};
