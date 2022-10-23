import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useStyles } from './styles';
import { IInputCheckbox } from './types';

const InputCheckbox = ({ label, value, onChange, className }: IInputCheckbox) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      className={className}
      control={
        <Checkbox
          onChange={onChange}
          checked={value}
          color="primary"
          data-testid={`parsing-checkbox-${label}`}
        />
      }
      label={<span className={classes.labelTextStyles}>{label}</span>}
    />
  );
};

export default InputCheckbox;
