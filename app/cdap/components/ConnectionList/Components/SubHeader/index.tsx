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

import Box from '@material-ui/core/Box';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import { useStyles } from 'components/ConnectionList/Components/SubHeader/styles';
import { ISubHeader } from 'components/ConnectionList/Components/SubHeader/types';
import Breadcrumb from 'components/GridTable/components/Breadcrumb';
import T from 'i18n-react';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getCurrentNamespace } from 'services/NamespaceStore';

export default function({ selectedConnection }: ISubHeader) {
  const classes = useStyles();
  const location = useLocation();

  const handleAddConnection = () => {
    localStorage.setItem('addConnectionRequestFromNewUI', selectedConnection);
  };

  return (
    <Box
      className={classes.breadcrumbContainer}
      data-testid="breadcrumb-container-parent"
      id="breadcrumb-container-parent"
    >
      <Breadcrumb
        datasetName={T.translate('features.NewWranglerUI.Breadcrumb.labels.connectionsList')}
        location={location}
      />

      <Box className={classes.importDataContainer}>
        <Link to={`/ns/${getCurrentNamespace()}/connections/create`} className={classes.link}>
          <Box
            onClick={handleAddConnection}
            className={classes.importData}
            data-testid="sub-header-handle-add-connection"
            id="sub-header-handle-add-connection"
          >
            <AddCircleOutlineOutlinedIcon className={classes.subHeaderIcon} />
            <Box className={classes.breadcrumbTyporgraphy}>
              {T.translate('features.NewWranglerUI.AddConnections.referenceLabel')}
            </Box>
          </Box>
        </Link>
        <Box className={classes.importData}>
          <SaveAltRoundedIcon className={classes.subHeaderIcon} />
          <Box className={classes.breadcrumbTyporgraphy}>
            {T.translate('features.NewWranglerUI.ImportData.referenceLabel')}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
