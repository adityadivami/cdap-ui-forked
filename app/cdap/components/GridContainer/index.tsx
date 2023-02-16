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

import GridTable from 'components/GridTable';
import React, { useState } from 'react';
import { DATATYPE_OPTIONS } from 'components/WranglerGrid/NestedMenu/menuOptions/datatypeOptions';
import { getAPIRequestPayload, applyDirectives } from 'components/GridContainer/services';
import { useParams } from 'react-router';
import { IRecords, IApiPayload, IGridParams } from 'components/GridTable/types';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import T from 'i18n-react';
import { execute } from 'components/DataPrep/store/DataPrepActionCreator';
import { connect, Provider } from 'react-redux';

function GridContainerComponent({ storeData }) {
  const { wid } = useParams() as IRecords;
  const params = useParams() as IRecords;
  const [transformationPayload, setTransformationPayload] = useState<
    Record<string, string | boolean>
  >({
    function: false,
    column: false,
  }); // whether i should apply transformation now or should pass data to add transformation step
  // const [] = useState();

  const handleTransformationUpload = (valueToUpdate: string, newValue) => {
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
        () => {},
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

  //   const getOptions = (functionName) => {
  //     let option;
  //     switch (option) {
  //       case : return DATATYPE_OPTIONS;
  //         break;
  //       case 1:
  //         day = "Monday";
  //         break;
  //       case 2:
  //         day = "Tuesday";
  //         break;
  //       case 3:
  //         day = "Wednesday";
  //         break;
  //       case 4:
  //         day = "Thursday";
  //         break;
  //       case 5:
  //         day = "Friday";
  //         break;
  //       case  6:
  //         day = "Saturday";
  //     }
  //   };

  const getDirective = (functionName: string, selectedColumnName: string | boolean) => {
    // const options = getOptions(functionName);
    if (DATATYPE_OPTIONS.some((eachOption) => eachOption.value === functionName)) {
      return `set-type :${selectedColumnName} ${functionName}`;
    }
  };

  const addDirectives = (directive: string) => {
    // setLoading(true);
    if (directive) {
      const apiPayload = getAPIRequestPayload(params, directive, '');
      addDirectiveAPICall(apiPayload);
    }
  };

  const addDirectiveAPICall = (apiPayload: IApiPayload) => {
    const gridParams: IGridParams = apiPayload.gridParams;
    applyDirectives(wid, gridParams.directives).subscribe(
      (response) => {
        DataPrepStore.dispatch({
          type: DataPrepActions.setWorkspace,
          payload: {
            data: response.values,
            values: response.values,
            headers: response.headers,
            types: response.types,
            ...gridParams,
          },
        });
        //     setSnackbar({
        //       open: true,
        //       isSuccess: true,
        //       message: T.translate(
        //         `features.WranglerNewUI.GridTable.snackbarLabels.datasetSuccess`
        //       ).toString(),
        //     });
        //     setLoading(false);
        //     setGridData(response);
        //     setAddTransformationFunction({
        //       option: '',
        //       supportedDataType: [],
        //     });
        //     setSelectedColumn('');
        //     setColumnType('');
        // handleAPIData('response');
      },
      (error) => {
        //     setLoading(false);
        //     setSnackbar({
        //       open: true,
        //       isSuccess: false,
        //       message: error.message,
        //     });
        //     setAddTransformationFunction({
        //       option: '',
        //       supportedDataType: [],
        //     });
        //     setSelectedColumn('');
        //     setColumnType('');
        // handleAPIData('error');
      }
    );
  };
  return (
    <div>
      <p>grid component</p>
      <Provider store={DataPrepStore}>
        <GridTable handleTransformationUpload={handleTransformationUpload} storeData={storeData} />
      </Provider>
    </div>
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
