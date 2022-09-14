import React from 'react';
import { useCss } from './styles';
import { Divider } from '@material-ui/core';
import { ColoredLine, LeftArrow } from './images';

const Search = (props) => {
  const classes = useCss();
  return (
    <div className={classes.searchResultBox}>
      <p className={classes.txtStyles}>Search results</p>
      {ColoredLine}
      {props.list.length > 0 &&
        props.list.map((item) => {
          return (
            <div>
              <p className={classes.options}>{item.option}</p>
              <div className={classes.flex}>
                <p className={classes.val}>{item.val}</p>
                {LeftArrow}
              </div>
              <Divider />
            </div>
          );
        })}
    </div>
  );
};

export default Search;
