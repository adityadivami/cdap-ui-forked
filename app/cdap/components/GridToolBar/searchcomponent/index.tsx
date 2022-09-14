import React from 'react';
import { useCss } from './styles';
import { Divider } from '@material-ui/core';

const Search = (props) => {
  const classes = useCss();
  return (
    <div className={classes.searchResultBox}>
      <p>Search Results</p>
      {props.list.length > 0 &&
        props.list.map((item) => {
          return (
            <div className={classes.cont}>
              <p>{item.option}</p>
              <p>{item.val}</p>
              <Divider />
            </div>
          );
        })}
    </div>
  );
};

export default Search;
