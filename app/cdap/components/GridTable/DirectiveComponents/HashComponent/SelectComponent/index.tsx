import { FormControlLabel, Input, Select } from '@material-ui/core';
import React from 'react';
import { styled, InputBase } from '@material-ui/core';
import { useStyles } from '../../styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    width: '100%',
    marginLeft: 15,
  },
  '& .MuiInputBase-input': {
    color: '#5F6368',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 14,
    padding: '10px 26px 10px 12px',
    '&:focus': {
      borderRadius: 4,
    },
  },
}));

const FormInputFieldComponent = (props) => {
  const classes = useStyles();
  const { formInputValue, classnames } = props;
  return (
    <FormControlLabel
      value={formInputValue}
      control={
        <Select
          input={<BootstrapInput className={classes.selectBootstrapInput} />}
          {...props.inputProps}
        >
          {props.children}
        </Select>
      }
      label=""
    />
  );
};

export default FormInputFieldComponent;
