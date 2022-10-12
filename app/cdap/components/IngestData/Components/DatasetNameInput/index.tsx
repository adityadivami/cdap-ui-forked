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

import { Box, FormControl, FormLabel, TextField, Tooltip } from '@material-ui/core';
import { DATASET_INPUT_LABEL } from 'components/IngestData/constants';
import React from 'react';
import { useStyles } from './styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const DatasetNameInput = (props) => {
  const classes = useStyles();
  const { datasetName, handleDatasetName, tooltipLabel } = props;
  return (
    <Box>
      <FormControl>
        <FormLabel className={classes.datasetInputLabel}>{DATASET_INPUT_LABEL}</FormLabel>
        <Box className={classes.inputInfo}>
          <TextField
            variant="outlined"
            value={datasetName}
            onChange={(e) => handleDatasetName(e)}
            classes={{ root: classes.datasetInput }}
            className={classes.outlinedInput}
          />
          <Box className={classes.infoIconContainer}>
            <Tooltip
              title={tooltipLabel}
              placement="top-start"
              classes={{ tooltip: classes.customTooltip }}
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};

export default DatasetNameInput;
