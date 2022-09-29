import React from 'react';
import { useCss } from './styles';
import { Divider } from '@material-ui/core';
import { ColoredLine, LeftArrow } from './images';

const Search = (props) => {
  const classes = useCss();

  const { name, clickEventListener } = props;

  const handleClick = (item) => {
    console.log(item);
    clickEventListener(item);
  };
  return (
    <div className={classes.searchResultBox}>
      <p className={classes.txtStyles}>{name}</p>
      {ColoredLine}
      {props.list.length > 0 &&
        props.list.map((item) => {
          return (
            <div key={item.val} onClick={() => handleClick(item)}>
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
