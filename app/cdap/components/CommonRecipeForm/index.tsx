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

import React, { useEffect, useState, useReducer } from 'react';
import {
  FormControl,
  TextField,
  TextareaAutosize,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import styled from 'styled-components';

const FormFieldWrapper = styled(Box)`
  width: calc(100% - 60px);
  margin-right: 60px;
  margin-bottom: 15px;
`;

const Label = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15;
  color: #5f6368;
`;

export default function() {
  return (
    <div>
      <form>
        <FormFieldWrapper>
          <Label data-testid="popup-body-label-text-format">Name of the new recipe:</Label>
          <TextField
            id="outlined-secondary"
            label="Outlined secondary"
            variant="outlined"
            color="secondary"
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormControl variant="outlined">
            <Label data-testid="popup-body-label-text-format">Description</Label>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Minimum 3 rows"
            />
          </FormControl>
        </FormFieldWrapper>

        <Button variant="outlined" color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Save
        </Button>
        {/* <label>
          Name of the new recipe:
          <input type="text" name="name" />
        </label>
        <label>
          Description
          <input type="submit" value="Submit" />
        </label> */}
      </form>
    </div>
  );
}
