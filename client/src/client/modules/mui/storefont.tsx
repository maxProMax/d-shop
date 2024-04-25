'use client';
import { FC, PropsWithChildren } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from './provider';

const theme = createTheme({ palette: { primary: { main: '#000' } } });

export const ThemeProviderStorefront: FC<PropsWithChildren> = ({
    children,
}) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
