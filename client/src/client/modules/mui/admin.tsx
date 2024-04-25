'use client';
import { FC, PropsWithChildren } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from './provider';

const theme = createTheme();

export const ThemeProviderAdmin: FC<PropsWithChildren> = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
