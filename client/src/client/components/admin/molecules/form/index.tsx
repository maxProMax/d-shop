import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect from '@mui/material/Select';
import { Image } from '@/client/components/common/image';
import { UploadButton } from '@/client/components/admin/atoms/button';
import styles from './styles.module.css';

export const Select: FC<{
    name: string;
    label: string;
    disabled?: boolean;
    defaultValue?: string;
    items: { value: string; text: string }[];
    formProps: UseFormRegisterReturn;
}> = ({ name, label, disabled, defaultValue, items, formProps }) => {
    return (
        <FormControl>
            <InputLabel id={name}>{label}</InputLabel>
            <MuiSelect
                labelId={name}
                label={label}
                disabled={disabled}
                defaultValue={defaultValue}
                {...formProps}
            >
                {items.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                        {c.text}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

export const UploadSection: FC<{
    formProps: UseFormRegisterReturn;
    dividerLabel?: string;
    src?: string;
}> = ({ formProps, dividerLabel, src }) => {
    return (
        <div className={styles.image}>
            <Divider textAlign="left">{dividerLabel}</Divider>
            {src && <Image src={src} alt="" />}
            <UploadButton register={formProps} />
        </div>
    );
};
