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

import { Box, Button, IconButton, Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentNamespace } from 'services/NamespaceStore';
import {
  DATASOURCES_URL_PARAM,
  HOME_LABLE,
  MATCH_SOURCE,
  WORKSPACE_LIST,
  WORKSPACES_OPEN,
} from './constants';
import { icon, icon1, DividerIcon } from './images';
import IngestViewSchemaDropDown from './KebabMenu';
import { useStyles } from './styles';

const BreadCrumb = ({ datasetName, location, setOpenPipeline, setOpenViewSchema }) => {
  const classes = useStyles();

  const sourcePath =
    location.state?.from === MATCH_SOURCE
      ? WORKSPACE_LIST
      : `${DATASOURCES_URL_PARAM}/${location.state?.path}`;
  return (
    <Box className={classes.breadCombContainer}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link
          className={`${classes.breadcrumbLabel} ${classes.home}`}
          to={`/ns/${getCurrentNamespace()}/home`}
          data-testid="breadcrumb-home-text"
        >
          {HOME_LABLE}
        </Link>
        {location.state.from !== 'home' && (
          <Link
            color="inherit"
            to={`/ns/${getCurrentNamespace()}/${sourcePath}`}
            className={`${classes.breadcrumbLabel}`}
          >
            {location.state.from}
          </Link>
        )}
        <Typography color="textPrimary">{datasetName}</Typography>

        <Breadcrumbs separator=" ">
          {DividerIcon}
          <Link className={`${classes.breadcrumbLabel} ${classes.home}`}>{WORKSPACES_OPEN}</Link>
        </Breadcrumbs>
      </Breadcrumbs>

      <Breadcrumbs separator=" ">
        <IconButton>{icon}</IconButton>
        <IconButton>{icon1}</IconButton>
        <IngestViewSchemaDropDown setOpenViewSchema={setOpenViewSchema} />
        <Button
          className={`${classes.Button} ${classes.pipelineStyles}`}
          onClick={() => setOpenPipeline(true)}
        >
          Create a Pipeline
        </Button>
      </Breadcrumbs>
    </Box>
  );
};
export default BreadCrumb;
