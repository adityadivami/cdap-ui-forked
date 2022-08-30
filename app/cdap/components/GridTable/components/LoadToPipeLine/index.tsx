/*
 * Copyright © 2022 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import { Box, IconButton } from '@material-ui/core';
import React from 'react';
import { useStyles } from './styles';
import Button from '@material-ui/core/Button';
import { DotsMenuSVG, CommentSVG, HelpSVG } from './icons';

const LoadToPipeLineArea = () => {
  const classes = useStyles();

  return (
    <Box className={classes.breadCombContainer}>
      <Box className={classes.iconContainer}>
        <IconButton>{HelpSVG}</IconButton>
        <IconButton>{CommentSVG}</IconButton>
        <IconButton>{DotsMenuSVG}</IconButton>
      </Box>
      <Button variant="contained" color="primary" size="medium" disableElevation>
        Load to pipeline
      </Button>
    </Box>
  );
};

export default LoadToPipeLineArea;
