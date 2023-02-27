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
   * In this useEffect we are handling apply transformation based on conditions
   * whether to apply transformation directly without add transformation panel open
   * or should pass data to add transformation step panel
   */
  useEffect(() => {
    if (selectedColumn && selectedFunction) {
      // If both function and column are selected, then apply transformation
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
    } else {
      // If selectedColumn is not selected then open add transformation panel and apply transformation
    }
  }, [selectedFunction, selectedColumn]);

  const handleSelectedFunctionColumnState = (valueToUpdate: string, newValue) => {
    if (valueToUpdate === 'function') {
      setSelectedFunction(newValue);
    } else if (valueToUpdate === 'column') {
      setSelectedFunction(null);
      setSelectedColumn(newValue);
    }
  };

  return (
    <Provider store={DataPrepStore}>
      <GridTable
        handleSelectedFunctionColumnState={handleSelectedFunctionColumnState}
        storeData={storeData}
        setSelectedColumn={setSelectedColumn}
        selectedColumn={selectedColumn}
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
