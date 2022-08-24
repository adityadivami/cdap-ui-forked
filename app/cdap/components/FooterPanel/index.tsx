import React from 'react';
import { Box } from '@material-ui/core';
import './index.scss';
import { Svg, Svg1, Svg2 } from './images';
const Footer = () => {
  return (
    <Box className="mainContainer">
      <Box className="cont">
        <Box className="imgCont">{Svg}</Box>
        <Box>
          <p className="paraElement"> Current data - 1000 rows and 30 columns</p>
        </Box>
        <Box className="zoomCont">
          {Svg1}
          <span className="spanElement"> 100%</span>
          {Svg2}
        </Box>
        <p className="directivesCont"> Directives </p>
        <Box className="recipeCont">
          <p> Recipe Steps</p>
          <p className="spanElement1"> 10</p>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
