import React from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { useStyles } from '../../styles';

const InputSelect = (props) => {
  const {
    options,
    value,
    onChange,
    classes,
    className,
    fullWidth,
    optionClassName,
    defaultValue,
  } = props;
  const anchorClass = useStyles();
  return (
    <Select
      classes={{ ...classes }}
      className={className}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      displayEmpty={false}
      defaultValue={defaultValue}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
        // classes: {
        //   paper: anchorClass.MUIPopover,
        // },
      }}
    >
      {options.map((option, index) => {
        return (
          <MenuItem
            classes={{ ...optionClassName }}
            value={option.value}
            key={option.value}
            data-testid={`input-select-${index}`}
          >
            {option.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default InputSelect;
