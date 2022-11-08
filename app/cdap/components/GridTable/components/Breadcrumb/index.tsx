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

import { Box, Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { Link } from 'react-router-dom';
import T from 'i18n-react';
import { getCurrentNamespace } from 'services/NamespaceStore';
import { useStyles } from './styles';

export default function Breadcrumb({ workspaceName, location }) {
  const classes = useStyles();

  const PREFIX = 'features.WranglerNewUI.Breadcrumb';
  const requestFromAddress = location?.state?.from;

  const sourcePath =
    requestFromAddress === T.translate(`${PREFIX}.labels.wrangleHome`)
      ? T.translate(`${PREFIX}.params.wrangleHome`)
      : `${T.translate(`${PREFIX}.params.connectionsList`)}/${location?.state?.path}`;

  return (
    <Box className={classes.breadCombContainer}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link
          className={`${classes.breadcrumbLabel} ${classes.home}`}
          to={`/ns/${getCurrentNamespace()}/home`}
          data-testid="breadcrumb-home-text"
        >
          {T.translate(`${PREFIX}.labels.wrangleHome`)}
        </Link>
        {requestFromAddress !== T.translate(`${PREFIX}.labels.wrangleHome`) && (
          <Link
            to={`/ns/${getCurrentNamespace()}/${sourcePath}`}
            data-testid="breadcrumb-data-sources-text"
            id="breadcrumb-data-sources-text"
          >
            {requestFromAddress}
          </Link>
        )}
        <Typography color="textPrimary" data-testid="breadcrumb-workspace-name">
          {workspaceName}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
}
