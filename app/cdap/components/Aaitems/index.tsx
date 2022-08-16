import * as React from 'react';
import './index.scss';

const Aaitems = (props) => {
  const { details } = props;
  const { id, imgUrl } = details;
  return <li className="listitem">{imgUrl}</li>;
};
export default Aaitems;
