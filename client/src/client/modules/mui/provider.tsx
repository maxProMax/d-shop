'use client';
import { FC, PropsWithChildren } from 'react';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const createEmotionCache = () => {
    return createCache({ key: 'css' });
};

export const ThemeProvider: FC<PropsWithChildren<{ theme: Theme }>> = ({
    children,
    theme,
}) => {
    const cache = createEmotionCache();

    return (
        <CacheProvider value={cache}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </CacheProvider>
    );
};
