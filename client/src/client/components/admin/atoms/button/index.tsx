import { FC } from 'react';
import { useTranslations } from 'next-intl';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const TextButton: FC<ButtonProps> = (props) => (
    <MuiButton variant="text" {...props} />
);

export const ContainedButton: FC<ButtonProps> = (props) => (
    <MuiButton variant="contained" {...props} />
);

export const UploadButton: FC<{ register: any }> = ({ register = {} }) => {
    const t = useTranslations('admin');

    return (
        <MuiButton
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            size="small"
            startIcon={<CloudUploadIcon />}
        >
            {t('form.buttons.upload')}
            <input hidden {...register} type="file" />
        </MuiButton>
    );
};
