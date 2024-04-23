import { FC } from 'react';
// import { useTranslations } from 'next-intl';
import MuiButton, { ButtonProps } from '@mui/material/Button';

export const TextButton: FC<ButtonProps> = (props) => (
    <MuiButton variant="text" {...props} />
);

export const ContainedButton: FC<ButtonProps> = (props) => (
    <MuiButton variant="contained" {...props} />
);
