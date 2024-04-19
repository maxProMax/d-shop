import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { FC, PropsWithChildren } from 'react';

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
    return <SnackbarProvider>{children}</SnackbarProvider>;
};
