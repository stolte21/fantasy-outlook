import React from 'react';
import { 
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem
} from '@material-ui/core';

const Select = ({ label, value, onChange, children }) => {
    return (
        <FormControl
            fullWidth
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect value={value} onChange={onChange}>
                {children.map(({ value, label }) => (
                    <MenuItem key={value || 'none'} value={value}>
                        {label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    )
};

export default Select;