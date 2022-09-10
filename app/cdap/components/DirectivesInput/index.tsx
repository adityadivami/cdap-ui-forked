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

import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Drawer, TextField, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import DirectivesAutocomplete from './components/DirectivesAutocomplete';
import { useState, useEffect } from 'react';
import DataPrepStore from 'components/DataPrep/store';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
type Anchor = 'bottom';

const DirectivesInput = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [directiveInput, setDirectiveInput] = useState('');
  const [error, setError] = useState(null);
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);

  const handleDirectiveChange = (e) => {
    setDirectiveInput(e.target.value);
    setAutoCompleteOpen(true);
    if (e.target.value === '') {
      setAutoCompleteOpen(false);
    }
  };

  const handleClose = () => {
    setDirectiveInput('');
    setState({ ...state, bottom: false });
  };
  // const handlePaste = (e) => {
  //   let data = e.clipboardData.getData('Text');
  //   data = data.split('\n').filter((row) => {
  //     // filter out empty rows
  //     return row.trim().length > 0;
  //   });

  //   if (data.length > 1) {
  //     e.preventDefault();
  //     execute(data);
  //   }
  // }
  // const execute = (addDirective)=> {
  //   execute(addDirective).subscribe(
  //     () => {
  //      setDirectiveInput('')
  //     },
  //     (err) => {
  //       DataPrepStore.dispatch({
  //         type: DataPrepActions.setCLIError,
  //         payload: {
  //           message: err.message || err.response.message,
  //         },
  //       });
  //     }
  //   );
  // }
  const getCurrentWorkspace = () => {
    DataPrepStore.subscribe(() => {
      const { error, dataprep } = DataPrepStore.getState();
      setError(error);
      if (dataprep.workspaceId !== currentWorkspace) {
        setCurrentWorkspace(dataprep.workspaceId);
      }
    });
  };
  const toggleAutoComplete = () => {
    setAutoCompleteOpen(!autoCompleteOpen);
  };

  useEffect(() => {
    getCurrentWorkspace();
  }, []);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box className={classes.directiveAndAutocomplete}>
      <DirectivesAutocomplete
        directiveInput={directiveInput}
        onRowClick={handleDirectiveChange}
        toggle={toggleAutoComplete}
        isOpen={autoCompleteOpen}
        hasError={error}
      />

      <Box
        style={{ width: anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        className={classes.container}
      >
        <Box className={classes.inputAndAmpersand}>
          <Box>
            <Typography className={classes.ampersand}>&#36;</Typography>
          </Box>
          <Box>
            <TextField
              fullWidth
              placeholder="Input a directive"
              InputProps={{ disableUnderline: true }}
              className={classes.input}
              type="text"
              value={directiveInput}
              onChange={handleDirectiveChange}
              id="directive-input"
              autoComplete="off"
              // onPaste = {handlePaste}
            />
          </Box>
        </Box>
        <Box>
          <Box>
            <ClearRoundedIcon className={classes.crossIcon} role="button" onClick={handleClose} />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      {(['bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
export default DirectivesInput;
