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

import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useStyles } from './styles';
import { TOGGLE_BUTTON_FILESET, TOGGLE_BUTTON_TABLE } from 'components/IngestData/constants';

const IngestDataToggle = (props) => {
  const { ingestDataToggle, handleToggleChange } = props;
  const classes = useStyles();
  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={ingestDataToggle}
        exclusive
        onChange={handleToggleChange}
        aria-label="Platform"
      >
        <ToggleButton
          value="fileset"
          classes={{
            root: classes.toggleButtonRoot,
            selected: classes.selected,
          }}
        >
          {TOGGLE_BUTTON_FILESET}
        </ToggleButton>
        <ToggleButton
          value="table"
          classes={{
            root: classes.toggleButtonRoot,
            selected: classes.selected,
          }}
        >
          {TOGGLE_BUTTON_TABLE}
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
export default IngestDataToggle;
