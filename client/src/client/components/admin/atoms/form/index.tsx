import { FC, PropsWithChildren, SyntheticEvent } from 'react';
import Stack from '@mui/material/Stack';
import styles from './styles.module.css';

interface IProps extends PropsWithChildren {
    onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
}

export const PageForm: FC<IProps> = ({ onSubmit, children }) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Stack spacing={2}>{children}</Stack>
        </form>
    );
};

export const FormContainer: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};
