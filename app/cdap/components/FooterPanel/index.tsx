import React from 'react';
import { Box } from '@material-ui/core';
import './index.scss';
import { Svg, Svg1 } from './images';
const Footer = () => {
  return (
    <Box className="cont">
      <Box className="cont1">{Svg}</Box>
      <Box className="cont2">
        <p className="paraele"> Current data - 1000 rows and 30 columns</p>
      </Box>
    </Box>
  );
};

export default Footer;
