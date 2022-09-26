import React from 'react';
import { MenuItem, Select } from '@material-ui/core';

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
      }}
    >
      {options.map((option) => {
        return (
          <MenuItem classes={...optionClassName} value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default InputSelect;
