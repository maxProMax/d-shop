import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect from '@mui/material/Select';

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
