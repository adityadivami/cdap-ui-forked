/*
 * Copyright © 2022 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain `a` copy of
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
import { fieldsetDataType } from 'components/IngestData';
import {
  DATASET_NAME_TOOLTIP,
  FORMAT_DATA_TOOLTOP,
  INGEST_DATA_TEXT,
  INGEST_DATA_TOGGLE_VALUE,
  MENU_SELECT_FORMAT_LABEL,
  MENU_SELECT_ROW_KEY_LABEL,
  ROW_KEY_TOOLTIP,
} from 'components/IngestData/constants';
import React from 'react';
import DatasetNameInput from '../DatasetNameInput';
import IngestDataToggle from '../IngestDataToggle';
import { MenuSelect } from '../MenuSelect';
import { useStyles } from './styles';

const IngestBody = (props) => {
  const classes = useStyles();
  const {
    ingestDataToggle,
    handleToggleChange,
    datasetName,
    handleDatasetName,
    selectValueFileset,
    handleSelectForFileset,
    selectValueTable,
    handleSelectForTable,
    headersNamesList,
  } = props;
  return (
    <>
      <Typography className={classes.titleText}>{INGEST_DATA_TEXT}</Typography>
      <Box className={classes.toggle}>
        <IngestDataToggle
          ingestDataToggle={ingestDataToggle}
          handleToggleChange={handleToggleChange}
        />
      </Box>
      <Box className={classes.inputFieldContainer}>
        <DatasetNameInput
          datasetName={datasetName}
          handleDatasetName={handleDatasetName}
          tooltipLabel={DATASET_NAME_TOOLTIP}
        />
      </Box>
      {ingestDataToggle === `${INGEST_DATA_TOGGLE_VALUE}` ? (
        <MenuSelect
          ingestMenuSelectlabel={MENU_SELECT_FORMAT_LABEL}
          menuItems={fieldsetDataType}
          ingestDataSelectValue={selectValueFileset}
          handleIngestDataSelectValue={handleSelectForFileset}
          menuSelectLabelStyle={classes.menuSelectLabel}
          tooltipLabel={FORMAT_DATA_TOOLTOP}
        />
      ) : (
        <MenuSelect
          ingestMenuSelectlabel={MENU_SELECT_ROW_KEY_LABEL}
          menuItems={headersNamesList}
          ingestDataSelectValue={selectValueTable}
          handleIngestDataSelectValue={handleSelectForTable}
          menuSelectLabelStyle={classes.menuSelectLabel}
          tooltipLabel={ROW_KEY_TOOLTIP}
        />
      )}
    </>
  );
};
export default IngestBody;
