import { FC } from 'react';
import { useTranslations } from 'next-intl';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import MuiButtonGroup from '@mui/material/ButtonGroup';
import LoadingButton from '@mui/lab/LoadingButton';

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

type ActionType = 'create' | 'edit' | 'delete';

export interface IActionButton {
    actionType: ActionType;
    loading?: boolean;
    type?: ButtonProps['type'];
    action?: () => void;
}

export const ButtonGroup: FC<{
    buttons: IActionButton[];
}> = ({ buttons }) => {
    const t = useTranslations('admin');
    const buttonsTexts: Record<ActionType, string> = {
        create: t('form.buttons.create'),
        edit: t('form.buttons.edit'),
        delete: t('form.buttons.delete'),
    };

    return (
        <MuiButtonGroup>
            {buttons.map((btn, i) => (
                <LoadingButton
                    key={i}
                    loading={btn.loading}
                    size="small"
                    type={btn.type || 'button'}
                    onClick={btn.action}
                    color={btn.actionType === 'delete' ? 'error' : 'info'}
                >
                    {buttonsTexts[btn.actionType]}
                </LoadingButton>
            ))}

            {/* <LoadingButton loading={loading} size="small" type="submit">
                {category ? t('form.buttons.edit') : t('form.buttons.create')}
            </LoadingButton>
            {category && (
                <LoadingButton
                    onClick={onDelete}
                    loading={loading}
                    size="small"
                    color="error"
                >
                    {t('form.buttons.delete')}
                </LoadingButton>
            )} */}
        </MuiButtonGroup>
    );
};
