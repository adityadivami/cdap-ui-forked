import React from 'react';
import Box from '@material-ui/core/Box';
import './index.scss';
import { IconButton } from '@material-ui/core';
import {
  SVG1,
  SVG2,
  SVG3,
  SVG4,
  SVG5,
  SVG6,
  SVG7,
  SVG8,
  SVG9,
  SVG10,
  SVG11,
  SVG12,
  SVG13,
  SVG14,
} from './images';

const ToolBarList = () => {
  return (
    <Box className="iconContainer">
      <Box className="container">
        <IconButton>{SVG1}</IconButton>
        <IconButton>{SVG2}</IconButton>

        {SVG3}
        <IconButton>{SVG4}</IconButton>
        <IconButton>{SVG5}</IconButton>
        <IconButton>{SVG6}</IconButton>

        {SVG3}
        <IconButton>{SVG7}</IconButton>
        <IconButton>{SVG8}</IconButton>
        <IconButton>{SVG9}</IconButton>
        <IconButton>{SVG10}</IconButton>
        <IconButton>{SVG11}</IconButton>

        {SVG3}
        <IconButton>{SVG12}</IconButton>

        {SVG3}
        <IconButton>{SVG13}</IconButton>
        <input type="search" placeholder="Search for Functions" className="searchIcon" />
      </Box>

      <IconButton>{SVG14}</IconButton>
    </Box>
  );
};

export default ToolBarList;
