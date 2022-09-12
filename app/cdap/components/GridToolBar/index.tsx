import React from 'react';
import Box from '@material-ui/core/Box';
import { useCss } from './styles';
import { IconButton } from '@material-ui/core';
import { searchItems } from './constants';
import {
  Undo,
  Redo,
  Divider,
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

const ToolBarList = () => {
  const classes = useCss();
  return (
    <Box className={classes.iconContainer}>
      <Box className={classes.container}>
        <IconButton>{Undo}</IconButton>
        <IconButton>{Redo}</IconButton>

        {Divider}
        <IconButton>{NullIcon}</IconButton>
        <IconButton>{InvalidIcon}</IconButton>
        <IconButton>{ColumnIcon}</IconButton>

        {Divider}
        <IconButton>{StructureIcon}</IconButton>
        <IconButton>{FragmentIcon}</IconButton>
        <IconButton>{MathIcon}</IconButton>
        <IconButton>{SecurityIcon}</IconButton>
        <IconButton>{OtherIcon}</IconButton>

        {Divider}
        <IconButton>{GridIcon}</IconButton>

        {Divider}
        <IconButton>{SearchIconn}</IconButton>
        <input type="search" placeholder="Search for Functions" className={classes.searchIcon} />
      </Box>

      <IconButton>{Expand}</IconButton>
    </Box>
  );
};

export default ToolBarList;
