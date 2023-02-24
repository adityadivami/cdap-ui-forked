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
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import GridTable from 'components/GridTable';
import { IMenuItem } from 'components/WranglerGrid/NestedMenu/MenuItemComponent';
import Snackbar from 'components/Snackbar';
import useSnackbar from 'components/Snackbar/useSnackbar';

const getDirective = (selectedFunction: IMenuItem, selectedColumnName: string | boolean) => {
  return selectedFunction.getUsage({ selectedColumnName, selectedFunction });
};

function GridContainerComponent({ storeData }) {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [transformationPayload, setTransformationPayload] = useState<
    Record<string, string | boolean>
  >({
    function: false,
    column: false,
  });

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

  // whether i should apply transformation now or should pass data to add transformation step
  const handleShouldApplyTransformation = (valueToUpdate: string, newValue) => {
    // valueToUpdate; // 'function', 'column'

    setTransformationPayload((prev) => ({
      function: valueToUpdate === 'function' ? newValue : prev.function,
      column: valueToUpdate === 'column' ? newValue : prev.column,
    }));

    // check if both function and column are selected
    if (
      (valueToUpdate == 'function' && transformationPayload.column) ||
      (valueToUpdate == 'column' && transformationPayload.function)
    ) {
      // if yes, then do applyDirective
      const directive = getDirective(newValue.option, transformationPayload.column);
      // addDirectives()
      execute([directive]).subscribe(
        () => {
          setSelectedColumn('');
          setTransformationPayload({
            function: false,
            column: false,
          });
          setSnackbar({
            open: true,
            isSuccess: true,
            message: 'Transformation Successfully Applied',
          });
        },
        (error) => {
          DataPrepStore.dispatch({
            type: DataPrepActions.setError,
            payload: {
              message: error.message || error.response.message,
            },
          });
        }
      );
    }
    // if no then return, do nothing
  };

  return (
    <Provider store={DataPrepStore}>
      <GridTable
        handleShouldApplyTransformation={handleShouldApplyTransformation}
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
