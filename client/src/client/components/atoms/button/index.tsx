import MuiButton, { ButtonProps } from '@mui/material/Button';
import { FC } from 'react';

export const TextButton: FC<ButtonProps> = (props) => (
    <MuiButton variant="text" {...props} />
);

export const ContainedButton: FC<ButtonProps> = (props) => (
    <MuiButton variant="contained" {...props} />
);
