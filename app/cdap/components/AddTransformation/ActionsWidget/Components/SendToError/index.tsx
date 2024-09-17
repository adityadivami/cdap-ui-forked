/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Typography,
  Checkbox,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from './styles';
import { SELECT_ACTION_TO_TAKE } from 'components/AddTransformation/constants';
import { SEND_TO_ERROR_OPTIONS } from './constants';

const SendToError = ({
  filterAction,
  setFilterAction,
  ignoreCase,
  setIgnoreCase,
  textValue,
  setTextValue,
}) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState<any | null>(null);
  const storeSelectedValue = (item) => {
    setSelectedOption(item);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.actionHeader}>
        <Typography className={classes.selectAction}>{SELECT_ACTION_TO_TAKE}</Typography>
        <img
          className={classes.greenCheckIcon}
          src="/cdap_assets/img/green-check.svg"
          alt="tick icon"
        />
      </Box>

      <Box className={classes.description}>
        When used in a pipeline, these errors can be collected by an error collector.
      </Box>
      <Box className={classes.formInputContainer}>
        <Typography className={classes.label}>If</Typography>
        <FormControl className={classes.selectBox}>
          <Select
            variant="outlined"
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
          >
            {SEND_TO_ERROR_OPTIONS.map((item, index) => {
              return (
                <MenuItem value={item.value} key={index} onClick={() => storeSelectedValue(item)}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.extraInputText}>
        {selectedOption && selectedOption?.extraInput?.show && (
          <>
            <FormControl>
              <TextField
                variant="outlined"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                label={selectedOption.extraInput.placeholder}
                className={classes.textInput}
              />
            </FormControl>

            {ignoreCase && (
              <FormControl>
                <FormControlLabel
                  label="Ignore case"
                  control={
                    <Checkbox
                      color="primary"
                      checked={ignoreCase}
                      onChange={(e) => setIgnoreCase(e.target.checked)}
                    />
                  }
                />
              </FormControl>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SendToError;
