import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useCss } from './styles';
import { IconButton, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/core';
import { searchItems } from './constants';
import Search from './searchcomponent';

import {
  Undo,
  Redo,
  DividerIcon,
  NullIcon,
  InvalidIcon,
  ColumnIcon,
  StructureIcon,
  FragmentIcon,
  MathIcon,
  SecurityIcon,
  OtherIcon,
  GridIcon,
  SearchIconn,
  Expand,
} from './images';

export default function ToolBarList() {
  const classes = useCss();
  const [value, setValue] = useState('');

  return (
    <Box className={classes.iconContainer}>
      <Box className={classes.container}>
        <IconButton>{Undo}</IconButton>
        <IconButton>{Redo}</IconButton>

        {DividerIcon}
        <IconButton>{NullIcon}</IconButton>
        <IconButton>{InvalidIcon}</IconButton>
        <IconButton>{ColumnIcon}</IconButton>

        {DividerIcon}
        <IconButton>{StructureIcon}</IconButton>
        <IconButton>{FragmentIcon}</IconButton>
        <IconButton>{MathIcon}</IconButton>
        <IconButton>{SecurityIcon}</IconButton>
        <IconButton>{OtherIcon}</IconButton>

        {DividerIcon}
        <IconButton>{GridIcon}</IconButton>

        {DividerIcon}

        <div className={classes.cont}>
          <div className={classes.cont1}>
            <IconButton>{SearchIconn}</IconButton>

            <Autocomplete
              id="combo-box-demo"
              options={searchItems}
              renderInput={(params) => <TextField {...params} label="options" />}
            />
          </div>
        </div>
      </Box>
      <IconButton>{Expand}</IconButton>
    </Box>
  );
}
