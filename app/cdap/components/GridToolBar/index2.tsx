import React, { useEffect, useState } from 'react';
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

const recentSearches = [
  {
    option: 'ADitya',
    val: 'aditya',
  },
];
const ToolBarLis = () => {
  const classes = useCss();
  const [list, setList] = useState([]);
  const [recentSearchesList, setRecentSearchesList] = useState([]);
  const [searchString, setSearchString] = useState<string>('');
  const [show, setShow] = useState(false);

  const handleSearch = (event) => {
    if (event.target.value) {
      setSearchString(event.target.value);
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
      setSearchString('');
    }
  };

  useEffect(() => {
    // get data from local storage and add here to set state value

    const recentSearchesLS = localStorage.getItem('recentSearchesList');
    let recentSearchesData = [];
    if (recentSearches) {
      recentSearchesData = JSON.parse(recentSearchesLS);
      console.log(recentSearchesData, 'recentSearchesData');
    }

    setRecentSearchesList(recentSearches);
  }, []);

  const handleFocus = () => {
    setShow(true);
  };
  const handleBlur = () => {
    // setShow(false);
  };

  const handleClickEvent = (item) => {
    const recentSearches = localStorage.getItem('recentSearchesList');
    let recentSearchesData = [];
    if (recentSearches) {
      recentSearchesData = [item, ...JSON.parse(recentSearches)].slice(0, 4);
    }

    localStorage.setItem('recentSearchesList', JSON.stringify(recentSearchesData));
    setRecentSearchesList(recentSearchesData);
    console.log(item);
    setShow(false);
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
              placeholder="Input a function name or description"
              type="search"
              onChange={handleSearch}
              onBlur={() => {
                setList([]);
              }}
              className={classes.searchIcon}
              onFocus={handleFocus}
              value={searchString}
            />
          </div>
          {show
            ? (list.length > 0 || recentSearchesList.length > 0) && (
                <Search
                  list={searchString && searchString.length ? list : recentSearchesList}
                  name={searchString && searchString.length ? 'Search Results' : 'Recent Searches'}
                  clickEventListener={handleClickEvent}
                />
              )
            : null}
        </div>
      </Box>
      <IconButton>{Expand}</IconButton>
    </Box>
  );
};

export default ToolBarLis;
