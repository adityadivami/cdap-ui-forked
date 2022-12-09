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

import { Table, TableBody, TableHead, TableRow, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import MyDataPrepApi from 'api/dataprep';
import { directiveRequestBodyCreator } from 'components/DataPrep/helper';
import { createRecipe } from 'components/Connections/Browser/GenericBrowser/apiHelpers';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import FooterPanel from 'components/FooterPanel';
import NoRecordScreen from 'components/NoRecordScreen';
import LoadingSVG from 'components/shared/LoadingSVG';
import { IValues } from 'components/WrangleHome/Components/OngoingDataExploration/types';
import T from 'i18n-react';
import React, { useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router';
import { flatMap } from 'rxjs/operators';
import { objectQuery } from 'services/helpers';
import Snackbar from 'components/Snackbar';
import useSnackbar from 'components/Snackbar/useSnackbar';
import BreadCrumb from 'components/GridTable/components/Breadcrumb';
import GridHeaderCell from 'components/GridTable/components/GridHeaderCell';
import GridKPICell from 'components/GridTable/components/GridKPICell';
import GridTextCell from 'components/GridTable/components/GridTextCell';
import { useStyles } from 'components/GridTable/styles';
import {
  IExecuteAPIResponse,
  IHeaderNamesList,
  IParams,
  IRecords,
  IType,
} from 'components/GridTable/types';
import RecipeSteps from 'components/RecipeSteps';
import { reducer, initialGridTableState } from 'components/GridTable/reducer';
import styled from 'styled-components';
import EditRecipe from 'components/EditRecipe';
import { IGridTableActions } from 'components/GridTable/reducer';

const TableWrapper = styled(Box)`
  height: calc(100vh - 193px);
  overflow-y: auto;
`;

const TablePanelContainer = styled(Box)`
  display: flex;
  font-family: Roboto;
`;

const RecipeStepPanel = styled(Box)`
  max-height: calc(100vh - 190px);
  box-shadow: -3px 4px 15px rgba(68, 132, 245, 0.25);
`;

export default function GridTable() {
  const { wid } = useParams() as IRecords;
  const params = useParams() as IRecords;
  const classes = useStyles();

  const { dataprep } = DataPrepStore.getState();
  const { recipeList } = dataprep;
  const history = useHistory();
  const [gridTableState, dispatch] = useReducer(reducer, initialGridTableState);
  const { tableMetaInfo } = gridTableState;

  const [loading, setLoading] = useState(false);
  const [headersNamesList, setHeadersNamesList] = useState<IHeaderNamesList[]>([]);
  const [rowsDataList, setRowsDataList] = useState([]);
  const [gridData, setGridData] = useState({} as IExecuteAPIResponse);
  const [missingDataList, setMissingDataList] = useState([]);
  const [invalidCountArray, setInvalidCountArray] = useState([
    {
      label: 'Invalid',
      count: '0',
    },
  ]);
  const [snackbarState, setSnackbar] = useSnackbar();
  const [showRecipePanel, setShowRecipePanel] = useState<boolean>(false);
  const [showRecipeSaveForm, setShowRecipeSaveForm] = useState<boolean>(false);
  const [isNameError, setIsNameError] = useState(false);
  const recipe_steps = [
    'uppercase: body1',
    'titlecase: body2',
    'uppercase: body3',
    'titlecase: body4',
  ];

  const getWorkSpaceData = (payload: IParams, workspaceId: string) => {
    let gridParams = {};
    setLoading(true);
    DataPrepStore.dispatch({
      type: DataPrepActions.setWorkspaceId,
      payload: {
        workspaceId,
        loading: true,
      },
    });
    MyDataPrepApi.getWorkspace(payload)
      .pipe(
        flatMap((res: IValues) => {
          const { dataprep } = DataPrepStore.getState();
          if (dataprep.workspaceId !== workspaceId) {
            return;
          }
          const directives = objectQuery(res, 'directives') || [];
          const requestBody = directiveRequestBodyCreator(directives);
          const sampleSpec = objectQuery(res, 'sampleSpec') || {};
          const visualization = objectQuery(res, 'insights', 'visualization') || {};

          const insights = {
            name: sampleSpec.connectionName,
            workspaceName: res.workspaceName,
            path: sampleSpec.path,
            visualization,
          };
          requestBody.insights = insights;

          const workspaceUri = objectQuery(res, 'sampleSpec', 'path');
          const workspaceInfo = {
            properties: insights,
          };
          gridParams = {
            directives,
            workspaceId,
            workspaceUri,
            workspaceInfo,
            insights,
          };
          return MyDataPrepApi.execute(payload, requestBody);
        })
      )
      .subscribe((response) => {
        DataPrepStore.dispatch({
          type: DataPrepActions.setWorkspace,
          payload: {
            data: response.values,
            headers: response.headers,
            types: response.types,
            ...gridParams,
          },
        });
        setLoading(false);
        setGridData(response);
      });
  };

  useEffect(() => {
    // Get DATA from URL paramteres to get data of workspace
    const payload = {
      context: params.namespace,
      workspaceId: params.wid,
    };
    getWorkSpaceData(payload, wid);
  }, [wid]);

  // ------------@createHeadersData Function is used for creating data of Table Header
  const createHeadersData = (columnNamesList: string[], columnTypesList: IRecords) => {
    if (Array.isArray(columnNamesList)) {
      return columnNamesList.map((eachColumnName: string) => {
        return {
          name: eachColumnName,
          label: eachColumnName,
          type: [columnTypesList[eachColumnName]],
        };
      });
    }
  };

  // ------------@convertNonNullPercent Function is used for calculation of Missing/Null value
  const convertNonNullPercent = (nonNullValue) => {
    const lengthOfData: number = gridData?.values.length;
    let count: number = 0;
    let emptyCount: number = 0;
    let nullValueCount: number = 0;
    if (lengthOfData) {
      nullValueCount = nonNullValue.null ? (nonNullValue.null / 100) * lengthOfData : 0;
      emptyCount = nonNullValue.empty ? (nonNullValue.empty / 100) * lengthOfData : 0;
      count = parseInt(nullValueCount.toFixed(0) + emptyCount.toFixed(0), 2);
    }
    return count;
  };

  // ------------@checkFrequentlyOccuredValues Function is used for checking which value appears maximum time in a column if that column doesn't have missing/null value
  const checkFrequentlyOccuredValues = (key) => {
    const valueOfKey = gridData.values.map((el) => el[key]);
    let mostFrequentItem: number = 1;
    let mostFrequentItemCount: number = 0;
    let mostFrequentItemValue: string | boolean | Record<string, IType> = '';
    const mostFrequentDataItem = {
      name: '',
      count: 0,
    };
    if (Array.isArray(valueOfKey) && valueOfKey.length) {
      valueOfKey.map((item, index) => {
        valueOfKey.map((value, valueIndex) => {
          if (item === value) {
            mostFrequentItemCount++;
          }
          if (mostFrequentItem < mostFrequentItemCount) {
            mostFrequentItem = mostFrequentItemCount;
            mostFrequentItemValue = item;
          }
        });
        mostFrequentItemCount = 0;
        mostFrequentItemValue = mostFrequentItemValue === '' ? item : mostFrequentItemValue;
      });
    }
    mostFrequentDataItem.name = mostFrequentItemValue;
    mostFrequentDataItem.count = mostFrequentItemCount;
    return mostFrequentDataItem;
  };

  // ------------@createMissingData Function is used for preparing data for second row of Table which shows Missing/Null Value
  const createMissingData = (statistics: IRecords) => {
    const statisticObjectToArray = Object.entries(statistics);
    const metricArray = [];
    statisticObjectToArray.forEach(([key, value]) => {
      const headerKeyTypeArray = Object.entries(value);
      const arrayForMissingValue = [];
      headerKeyTypeArray.forEach(([vKey, vValue]) => {
        if (vKey !== 'types') {
          arrayForMissingValue.push({
            label:
              convertNonNullPercent(vValue) === 0
                ? checkFrequentlyOccuredValues(key).name
                : 'Missing/Null',
            count:
              convertNonNullPercent(vValue) === 0
                ? checkFrequentlyOccuredValues(key).count
                : convertNonNullPercent(vValue),
          });
        }
      }),
        metricArray.push({
          name: key,
          values: arrayForMissingValue.concat(invalidCountArray),
        });
    });
    return metricArray;
  };

  // ------------@getGridTableData Function is used for preparing data for entire grid-table
  const getGridTableData = async () => {
    const rawData: IExecuteAPIResponse = gridData;
    const headersData = createHeadersData(rawData.headers, rawData.types);
    setHeadersNamesList(headersData);
    if (rawData && rawData.summary && rawData.summary.statistics) {
      const missingData = createMissingData(gridData?.summary.statistics);
      setMissingDataList(missingData);
    }
    const rowData =
      rawData &&
      rawData.values &&
      Array.isArray(rawData.values) &&
      rawData.values.map((eachRow) => {
        const { body, ...rest } = eachRow;
        return rest;
      });
    dispatch({
      type: IGridTableActions.TABLE_META_INFO,
      payload: {
        columnCount: rawData?.headers?.length,
        rowCount: rawData?.values?.length - 1,
      },
    }),
      setRowsDataList(rowData);
  };

  const showRecipePanelHandler = () => {
    setShowRecipePanel((prev) => !prev);
  };

  useEffect(() => {
    getGridTableData();
  }, [gridData]);

  const saveRecipeData = (data) => {
    createRecipe();
    const body = {
      name: data.name,
      description: data.description,
      directives: recipe_steps,
      id: recipeList.length + 1,
    };
    DataPrepStore.dispatch({
      type: DataPrepActions.setRecipeList,
      payload: [...recipeList, body],
    });
  };

  const onRecipeDataSave = (data) => {
    data.directives = recipe_steps;
    const error = recipeList?.some((elem) => elem.name === data.name);
    if (error) {
      setIsNameError(error);
    } else {
      saveRecipeData(data);
      setSnackbar({
        open: true,
        isSuccess: true,
        message: `${data.directives} Steps successfully saved as a recipe!`,
      });
      setIsNameError(false);
      setShowRecipeSaveForm(false);
    }
  };

  const onRecipeFormCancel = () => {
    setShowRecipeSaveForm(false);
    setIsNameError(false);
  };

  return (
    <Box data-testid="grid-table-container">
      <BreadCrumb datasetName={wid} />
      <Button
        onClick={() => history.push(`/ns/default/saved-recipe-list`)}
        data-tsetid="recipe-form-edit-button"
        variant="outlined"
        color="primary"
      >
        {/* {T.translate('features.WranglerNewUI.RecipeForm.labels.edit')} */}
        Saved Recipe List
      </Button>

      <TablePanelContainer>
        {Array.isArray(gridData?.headers) && gridData?.headers.length > 0 ? (
          <TableWrapper>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {headersNamesList?.length &&
                    headersNamesList.map((eachHeader) => (
                      <GridHeaderCell
                        label={eachHeader.label}
                        types={eachHeader.type}
                        key={eachHeader.name}
                      />
                    ))}
                </TableRow>
                <TableRow>
                  {missingDataList?.length &&
                    headersNamesList.length &&
                    headersNamesList.map((each, index) => {
                      return missingDataList.map((item, itemIndex) => {
                        if (item.name === each.name) {
                          return <GridKPICell metricData={item} key={item.name} />;
                        }
                      });
                    })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsDataList?.length &&
                  rowsDataList.map((eachRow, rowIndex) => {
                    return (
                      <TableRow key={`row-${rowIndex}`}>
                        {headersNamesList.map((eachKey, eachIndex) => {
                          return (
                            <GridTextCell
                              cellValue={eachRow[eachKey.name] || '--'}
                              key={`${eachKey.name}-${eachIndex}`}
                            />
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableWrapper>
        ) : (
          <NoRecordScreen
            title={T.translate('features.WranglerNewUI.NoRecordScreen.gridTable.title')}
            subtitle={T.translate('features.WranglerNewUI.NoRecordScreen.gridTable.subtitle')}
          />
        )}
        {showRecipePanel && (
          <RecipeStepPanel>
            <RecipeSteps
              setShowRecipePanel={setShowRecipePanel}
              setShowRecipeSaveForm={setShowRecipeSaveForm}
              showRecipeSaveForm={showRecipeSaveForm}
              recipeData={recipeList}
              onRecipeDataSave={onRecipeDataSave}
              onCancel={onRecipeFormCancel}
              isNameError={isNameError}
            />
          </RecipeStepPanel>
        )}
      </TablePanelContainer>
      {loading && (
        <div className={classes.loadingContainer}>
          <LoadingSVG />
        </div>
      )}
      <Snackbar // TODO: This snackbar is just for the feature demo purpose. Will be removed in the further development.
        handleClose={() =>
          setSnackbar(() => ({
            open: false,
          }))
        }
        open={snackbarState.open}
        message={snackbarState.message}
        isSuccess={snackbarState.isSuccess}
      />
      <FooterPanel
        recipeStepsCount={0}
        gridMetaInfo={tableMetaInfo}
        handleShowRecipePanelHandler={showRecipePanelHandler}
      />
    </Box>
  );
}
