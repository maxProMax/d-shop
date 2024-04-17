'use client';
import { FC, PropsWithChildren } from 'react';
import MuiPopover from '@mui/material/Popover';
import styles from './styles.module.css';

interface IProps extends PropsWithChildren {
    open: boolean;
    id?: string;
    onClose: () => void;
    anchorEl: HTMLElement | null;
}

export const Popover: FC<IProps> = ({
    id,
    children,
    open,
    anchorEl,
    onClose,
}) => {
    return (
        <MuiPopover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            className={'styles.popover'}
            classes={{ paper: styles.paper }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            {children}
        </MuiPopover>
    );
};
