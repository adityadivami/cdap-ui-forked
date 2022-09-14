import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { useCss } from './styles';
import { IconButton } from '@material-ui/core';
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

const ToolBarList = () => {
  const classes = useCss();
  const [list, setList] = useState([]);
  const handleSearch = (event) => {
    if (event.target.value) {
      const getFilterVal = searchItems.filter(
        (el) =>
          el.option.toLowerCase().includes(event.target.value.toLowerCase()) ||
          el.val.toLowerCase().includes(event.target.value.toLowerCase())
      );
      if (getFilterVal.length) {
        setList(getFilterVal);
      } else {
        setList([]);
      }
    } else {
      setList(searchItems);
    }
  };
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

            <input
              placeholder="Search Functions"
              onChange={handleSearch}
              onBlur={() => {
                setList([]);
              }}
              className={classes.searchIcon}
            />
          </div>

          {list.length > 0 && <Search list={list} />}
        </div>
      </Box>

      <IconButton>{Expand}</IconButton>
    </Box>
  );
};

export default ToolBarList;
