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

import { Breadcrumbs, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useStyles } from 'components/ConnectionList/Components/SubHeader/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentNamespace } from 'services/NamespaceStore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import T from 'i18n-react';

export default function({ selectedConnection }: { selectedConnection: string }) {
  const classes = useStyles();
  const handleAddConnection = () => {
    localStorage.setItem('requestFrom', selectedConnection);
  };

  return (
    <Box className={classes.breadCombContainer} data-testid="bread-comb-container-parent">
      <Box>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" to={`/ns/${getCurrentNamespace()}/home`}>
            {T.translate('features.Breadcrumb.labels.wrangleHome')}
          </Link>
          <Typography className={classes.breadcrumbTyporgraphy}>
            {T.translate('features.Breadcrumb.labels.connectionsList')}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box className={classes.importDataContainer}>
        <Link to={`/ns/${getCurrentNamespace()}/connections/create`} className={classes.link}>
          <Box
            onClick={handleAddConnection}
            className={classes.importData}
            data-testid="sub-header-handle-add-connection"
          >
            <AddCircleOutlineOutlinedIcon className={classes.subHeaderIcon} />
            <Box className={classes.breadcrumbTyporgraphy}>
              {T.translate('features.AddConnections.referenceLabel')}
            </Box>
          </Box>
        </Link>
        <Box className={classes.importData}>
          <SaveAltRoundedIcon className={classes.subHeaderIcon} />
          <Box className={classes.breadcrumbTyporgraphy}>
            {T.translate('features.ImportData.referenceLabel')}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
