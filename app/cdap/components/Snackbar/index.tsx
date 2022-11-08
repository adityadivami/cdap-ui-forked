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

import Snackbar from '@material-ui/core/Snackbar';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import Transition from 'components/Snackbar/Components/Transition/index';
import { useStyles } from 'components/Snackbar/styles';
import { ISnackbarProps } from 'components/Snackbar/types';
import React, { useEffect, useState } from 'react';

export default function({ description = '', isSuccess, snackbarAction }: ISnackbarProps) {
  const classes = useStyles();

  const { dataprep } = DataPrepStore.getState();
  const { snackbarStatus } = dataprep;
  // useEffect(() => {
  //   setSnackbarState({ open: true });
  //   const timer = setTimeout(() => {
  //     setSnackbarState({ open: false });
  //   }, 5000);
  //   return () => {
  //     setSnackbarState({ open: true });
  //     clearTimeout(timer);
  //   };
  // }, []);

  const handleClose = () => {
    DataPrepStore.dispatch({
      type: DataPrepActions.setSnackbarStatus,
      payload: {
        open: false,
      },
    });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={snackbarStatus.open}
      classes={{
        anchorOriginTopLeft: classes.anchor,
        root: classes.root,
      }}
      TransitionComponent={() => (
        <Transition
          handleClose={() => handleClose()}
          isSuccess={isSuccess}
          messageToDisplay={description}
          transitionAction={snackbarAction}
        />
      )}
      className={isSuccess ? classes.success : classes.error}
      data-testid="snackbar-alert"
    />
  );
}
