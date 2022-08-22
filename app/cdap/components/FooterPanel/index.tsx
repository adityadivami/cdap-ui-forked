import React from 'react';
import { Box } from '@material-ui/core';
import './index.scss';
import { Svg, Svg1, Svg2 } from './images';
const Footer = () => {
  return (
    <Box className="main">
      <Box className="cont">
        <Box className="cont1">{Svg}</Box>
        <Box className="cont2">
          <p className="paraele"> Current data - 1000 rows and 30 columns</p>
        </Box>
        <Box className="cont3">
          {Svg1}
          <span className="spanele"> 100%</span>
          {Svg2}
        </Box>
        <p className="cont4">Directives</p>
        <Box className="cont5">
          <p> Recipe Steps</p>
          <p className="spanele1"> 10</p>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
