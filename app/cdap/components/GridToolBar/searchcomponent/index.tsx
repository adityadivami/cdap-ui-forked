import React from 'react';
import { useCss } from './styles';

const Search = (props) => {
  const classes = useCss();
  return (
    <div>
      {props.list.length > 0 &&
        props.list.map((item) => {
          return (
            <div>
              <p>{item.option}</p>
              <p>{item.val}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Search;
