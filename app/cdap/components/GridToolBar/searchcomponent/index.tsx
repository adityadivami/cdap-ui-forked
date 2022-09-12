import React from 'react';

const Search = (props) => {
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
