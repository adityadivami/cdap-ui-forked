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

import React, { useState, useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import DataPrepStore from 'components/DataPrep/store';
import { execute } from 'components/DataPrep/store/DataPrepActionCreator';
import GridTable from 'components/GridTable';
import { IMenuItem } from 'components/WranglerGrid/NestedMenu/MenuItemComponent';
import Snackbar from 'components/Snackbar';
import useSnackbar from 'components/Snackbar/useSnackbar';

const getDirective = (selectedFunction: IMenuItem, selectedColumnName: string) => {
  return selectedFunction.getUsage({ selectedColumnName, selectedFunction });
};

function GridContainerComponent({ storeData }) {
  const [selectedFunction, setSelectedFunction] = useState({
    option: {
      getUsage({}) {
        return '';
      },
      label: '',
      supportedDataType: [''],
      value: '',
    },
    supportedType: [''],
  });
  const [selectedColumn, setSelectedColumn] = useState('');

  const [snackbarState, setSnackbar] = useSnackbar();

  useEffect(() => {
    if (snackbarState.open) {
      setTimeout(() => {
        setSnackbar(() => ({
          open: false,
        }));
      }, 5000);
    }
  }, [snackbarState.open]);

  /*
   * In the useEffect we are handling 2 cases
   * 1. If extra input is not required for the selected transformation, and if the column is selected,
   * then we will directly apply the transformation on the grid data
   * 2. If the extra input is needed, then we will open the add transformation step panel
   * where we can continue further steps to apply the transformation
   */

  useEffect(() => {
    if (selectedColumn && selectedFunction) {
      const directive = getDirective(selectedFunction.option, selectedColumn);
      execute([directive]).subscribe(
        () => {
          setSelectedColumn('');
          setSelectedFunction(null);
          setSnackbar({
            open: true,
            isSuccess: true,
            message: 'Transformation Successfully Applied',
          });
        },
        (error) => {
          setSnackbar({
            open: true,
            isSuccess: false,
            message: error.message || error.response.message,
          });
        }
      );
    }
    /*
     * TODO: If selected function need any additional input then open add transformation panel
     * where we can continue further steps to apply the transformation
     */
  }, [selectedFunction, selectedColumn]);

  return (
    <Provider store={DataPrepStore}>
      <GridTable
        storeData={storeData}
        setSelectedColumn={setSelectedColumn}
        selectedColumn={selectedColumn}
        setSelectedFunction={setSelectedFunction}
        setSnackbar={setSnackbar}
      />
      {
        <Snackbar
          handleClose={() =>
            setSnackbar(() => ({
              open: false,
            }))
          }
          open={snackbarState.open}
          message={snackbarState.message}
          isSuccess={snackbarState.isSuccess}
        />
      }
    </Provider>
  );
}

const ConnectedGridContainer = connect((state) => ({ storeData: state }))(GridContainerComponent);

export default function GridContainer() {
  return (
    <Provider store={DataPrepStore}>
      <ConnectedGridContainer />
    </Provider>
  );
}
