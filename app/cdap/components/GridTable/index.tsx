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

import {
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MyDataPrepApi from 'api/dataprep';
import AddTransformation from 'components/AddTransformation';
import ColumnInsightDrawer from 'components/ColumnInsights';
import { directiveRequestBodyCreator } from 'components/DataPrep/helper';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import DirectiveInputDrawer from 'components/DirectiveInput';
import FooterPanel from 'components/FooterPanel';
import ParsingDrawer from 'components/ParsingDrawer';
import RecipeSteps from 'components/RecipeSteps';
import LoadingSVG from 'components/shared/LoadingSVG';
import { IValues } from 'components/WrangleHome/Components/OngoingDataExploration/types';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { flatMap } from 'rxjs/operators';
import { objectQuery } from 'services/helpers';
import ToolBarList from './components/AaToolbar';
import BreadCrumb from './components/Breadcrumb';
import GridHeaderCell from './components/GridHeaderCell';
import GridKPICell from './components/GridKPICell';
import GridTextCell from './components/GridTextCell';
import NoDataScreen from './components/NoRecordScreen';
import { OPTION_WITH_NO_INPUT, OPTION_WITH_TWO_INPUT } from './constants';
import { getDirective, getDirectiveOnTwoInputs } from './directives';
import { useStyles } from './styles';
import { IExecuteAPIResponse, IHeaderNamesList, IParams, IRecords, IObject } from './types';
import PositionedSnackbar from 'components/SnackbarComponent';
import {
  calculateDistinctValues,
  characterCount,
  convertNonNullPercent,
  checkAlphaNumericAndSpaces,
  calculateDistributionGraphData,
} from './utils';
import ColumnView from 'components/ColumnView';
import CreatePipelineModal from './components/Modals/CreatePipeLineModal';
import ViewSchemaModal from './components/Modals/ViewSchemaModal';
import { multipleColumnSelected } from 'components/AddTransformation/constants';

export default function() {
  const { wid } = useParams() as IRecords;
  const params = useParams() as IRecords;
  const classes = useStyles();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [headersNamesList, setHeadersNamesList] = useState<IHeaderNamesList[]>([]);
  const [rowsDataList, setRowsDataList] = useState([]);
  const [gridData, setGridData] = useState<any>({});
  const [missingDataList, setMissingDataList] = useState([]);
  const [insightDrawer, setInsightDrawer] = useState({
    open: false,
    columnName: '',
    distinctValues: 0,
    characterCount: {
      min: 0,
      max: 0,
    },
    dataQuality: {
      missingNullValueCount: 0,
      missingNullValuePercentage: 0,
      invalidValueCount: 0,
      invalidValuePercentage: 0,
    },
    dataQualityBar: {},
    dataTypeString: '',
    dataDistributionGraphData: [],
  });
  const [dataQuality, setDataQuality] = useState({});
  const [optionSelected, setOptionSelected] = useState(null);
  const { dataprep } = DataPrepStore.getState();
  const [isFirstWrangle, setIsFirstWrangle] = useState(false);
  const [openDirective, setOpenDirective] = useState(false);
  const [maskSelection, setMaskSelection] = useState(false);
  const [invalidCountArray, setInvalidCountArray] = useState([
    {
      label: 'Invalid',
      count: '0',
    },
  ]);
  const [columnSelected, setColumnSelected] = useState('');
  const [directiveFunction, setDirectiveFunction] = useState('');
  const [progress, setProgress] = useState([]);
  const [directiveFunctionSupportedDataType, setDirectiveFunctionSupportedDataType] = useState([]);
  const [columnType, setColumnType] = useState('');

  const [connectorType, setConnectorType] = useState(null);
  const [showRecipePanel, setShowRecipePanel] = useState(false);
  const [toaster, setToaster] = useState({
    open: false,
    message: '',
    isSuccess: false,
  });
  const [toastAction, setToastAction] = useState('');
  const [openPipeline, setOpenPipeline] = useState(false);
  const [openViewSchema, setOpenViewSchema] = useState(false);
  const [dataCounts, setDataCounts] = useState({
    rowCount: 0,
    columnCount: 0,
  });
  const [showBreadCrumb, setShowBreadCrumb] = useState(true);
  const [openColumnView, setOpenColumnView] = useState(false);

  useEffect(() => {
    setIsFirstWrangle(true);
    setConnectorType(dataprep.connectorType);
  }, []);

  const getWorkSpaceData = (
    params: IParams,
    workspaceId: string,
    selectedDirective?: string[] | undefined
  ) => {
    let gridParams = {};
    setLoading(true);
    DataPrepStore.dispatch({
      type: DataPrepActions.setWorkspaceId,
      payload: {
        workspaceId,
        loading: true,
      },
    });
    MyDataPrepApi.getWorkspace(params)
      .pipe(
        flatMap((res: IValues) => {
          const { dataprep } = DataPrepStore.getState();
          setWorkspaceName(res.workspaceName);
          if (dataprep.workspaceId !== workspaceId) {
            return;
          }
          const directives = objectQuery(res, 'directives') || [];
          const updatedDirectives =
            selectedDirective?.length > 0 ? directives.concat(selectedDirective) : directives;
          const requestBody = directiveRequestBodyCreator(updatedDirectives);
          const sampleSpec = objectQuery(res, 'sampleSpec') || {};
          const visualization = objectQuery(res, 'insights', 'visualization') || {};

          const insights = {
            name: res?.sampleSpec?.connectionName,
            workspaceName: res.workspaceName,
            path: res?.sampleSpec?.path,
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
          return MyDataPrepApi.execute(params, requestBody);
        })
      )
      .subscribe(
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
          setLoading(false);
          setGridData(response);
          setDirectiveFunction('');
          setColumnSelected('');
          if (selectedDirective) {
            setToaster({
              open: true,
              message: `${selectedDirective} added successfully`,
              isSuccess: true,
            });
          }
          setDataCounts({
            rowCount: response.values.length,
            columnCount: response.headers.length,
          });
        },
        (err) => {
          setToaster({
            open: true,
            message: 'Failed to load data',
            isSuccess: false,
          });
          setLoading(false);
        }
      );
  };

  const updateDataTranformation = (wid: string) => {
    const payload = {
      context: params.namespace,
      workspaceId: wid,
    };
    getWorkSpaceData(payload, wid);
    setIsFirstWrangle(false);
  };

  const showRecipePanelHandler = () => {
    setShowRecipePanel((prev) => !prev);
  };

  const [showAddTransformation, setSshowAddTransformation] = useState(false);
  const showAddTransformationHandler = () => {
    setSshowAddTransformation((prev) => !prev);
  };

  const applyDirective = (option, columnSelected, supported_dataType, value_1?) => {
    setLoading(true);
    setOptionSelected(option);
    setDirectiveFunctionSupportedDataType(supported_dataType);
    if (
      (option === 'custom-selection' ||
        optionSelected === 'custom-selection' ||
        option === 'using-positions' ||
        optionSelected === 'using-positions') &&
      Boolean(columnSelected) &&
      !value_1
    ) {
      setDirectiveFunction('');
      setMaskSelection(true);
      setLoading(false);
    } else if (
      (option === 'custom-selection' ||
        optionSelected === 'custom-selection' ||
        option === 'using-positions' ||
        optionSelected === 'using-positions') &&
      Boolean(columnSelected) &&
      value_1
    ) {
      const newDirective = getDirectiveOnTwoInputs(option, columnSelected, value_1);
      applyDirectiveAPICall(newDirective, 'add', [], '');
    } else {
      if (
        multipleColumnSelected.filter((el) => el.value === option || el.value === optionSelected)
          .length
      ) {
        const newDirective = getDirectiveOnTwoInputs(option, columnSelected, value_1);
        if (!Boolean(value_1)) {
          setDirectiveFunction(option);
          setLoading(false);
          return;
        } else {
          applyDirectiveAPICall(newDirective, 'add', [], '');
          setIsFirstWrangle(false);
        }
      } else {
        if (OPTION_WITH_NO_INPUT.includes(option)) {
          const newDirective = getDirective(option, columnSelected);
          if (!columnSelected) {
            setDirectiveFunction(option);
            setLoading(false);
            return;
          } else {
            applyDirectiveAPICall(newDirective, 'add', [], '');
            setIsFirstWrangle(false);
          }
        } else if (OPTION_WITH_TWO_INPUT.includes(option)) {
          const newDirective = getDirectiveOnTwoInputs(option, columnSelected, value_1);
          if (!Boolean(value_1)) {
            setDirectiveFunction(option);
            setLoading(false);
            return;
          } else {
            applyDirectiveAPICall(newDirective, 'add', [], '');
            setIsFirstWrangle(false);
          }
        }
      }
    }
  };

  const applyDirectiveAPICall = (newDirective, action, removed_arr, from) => {
    setLoading(true);
    const { dataprep } = DataPrepStore.getState();
    const { workspaceId, workspaceUri, directives, insights } = dataprep;
    let gridParams = {};
    const updatedDirectives = action === 'add' ? directives.concat(newDirective) : newDirective;
    const requestBody = directiveRequestBodyCreator(updatedDirectives);
    const arr = JSON.parse(JSON.stringify(newDirective));
    requestBody.insights = insights;

    const workspaceInfo = {
      properties: insights,
    };
    gridParams = {
      directives: updatedDirectives,
      workspaceId,
      workspaceUri,
      workspaceInfo,
      insights,
    };
    const payload = {
      context: params.namespace,
      workspaceId: params.wid,
    };
    MyDataPrepApi.execute(payload, requestBody).subscribe(
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
        setLoading(false);
        setGridData(response);
        setDirectiveFunction('');
        setColumnSelected('');
        setShowRecipePanel(false);
        setToaster({
          open: true,
          message:
            action === 'add'
              ? `Transformation ${arr} successfully added`
              : from === 'undo' || arr?.length === 0
              ? 'Transformation successfully deleted'
              : `${removed_arr?.length} transformation successfully deleted from ${
                  arr[arr.length - 1]
                }`,
          isSuccess: true,
        });
        if (action === 'add') {
          setToastAction('add');
        } else if (action === 'delete') {
          setToastAction('delete');
        }
      },
      (err) => {
        setToaster({
          open: true,
          message: `Failed to transform ${newDirective}`,
          isSuccess: false,
        });
        setLoading(false);
        setShowRecipePanel(false);
      }
    );
  };

  useEffect(() => {
    const payload = {
      context: params.namespace,
      workspaceId: params.wid,
    };
    getWorkSpaceData(payload as IParams, wid as string);
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

  const createMissingData = (statistics: IObject) => {
    const statisticObjectToArray = Object.entries(statistics);
    const metricArray = [];
    statisticObjectToArray.forEach(([key, value]) => {
      const headerKeyTypeArray = Object.entries(value);
      const typeArrayOfMissingValue = [];
      headerKeyTypeArray.forEach(([vKey, vValue]) => {
        typeArrayOfMissingValue.push({
          label: vKey == 'general' ? 'Missing/Null' : vKey == 'types' ? '' : '',
          count: vKey == 'types' ? '' : convertNonNullPercent(gridData, key, vValue),
        });
      }),
        metricArray.push({
          name: key,
          values: typeArrayOfMissingValue.concat(invalidCountArray),
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
      setDataQuality(gridData.summary.statistics);
    }
    const rowData =
      rawData &&
      rawData.values &&
      Array.isArray(rawData?.values) &&
      rawData?.values.map((eachRow: {}) => {
        return eachRow;
      });
    setRowsDataList(rowData);
    const progressValues = [];
    for (const title in gridData.summary.statistics) {
      const { general } = gridData.summary.statistics[title] || {};
      const { empty: empty = 0, 'non-null': nonEmpty = 100 } = general;
      const nonNull = Math.floor((nonEmpty - empty) * 10) / 10;
      progressValues.push({ value: nonNull, key: title });
    }
    setProgress(progressValues);
  };

  const onColumnSelection = (columnName) => {
    const getDistinctValue = calculateDistinctValues(rowsDataList, columnName);
    const getCharacterCountOfCell = characterCount(rowsDataList, columnName);
    const getMissingValueCount =
      convertNonNullPercent(
        gridData,
        columnName,
        gridData?.summary?.statistics[columnName].general
      ) || 0;
    const getDataTypeString = checkAlphaNumericAndSpaces(rowsDataList, columnName);
    setInsightDrawer({
      open: true,
      columnName,
      distinctValues: getDistinctValue,
      characterCount: getCharacterCountOfCell,
      dataQuality: {
        missingNullValueCount: Number(getMissingValueCount),
        missingNullValuePercentage: Number(
          ((Number(Number(getMissingValueCount).toFixed(0)) / rowsDataList.length) * 100).toFixed(0)
        ),
        invalidValueCount: 0,
        invalidValuePercentage: 0,
      },
      dataQualityBar: gridData?.summary?.statistics[columnName],
      dataTypeString: getDataTypeString,
      dataDistributionGraphData: calculateDistributionGraphData(rowsDataList, columnName),
    });
  };

  useEffect(() => {
    getGridTableData();
  }, [gridData]);

  const handleColumnSelect = (columnName) => {
    setColumnSelected((prevColumn) => (prevColumn === columnName ? '' : columnName));
    setColumnType(types[columnName]);
  };

  const deleteRecipes = (new_arr, remaining_arr) => {
    applyDirectiveAPICall(new_arr, 'delete', remaining_arr, 'panel');
    DataPrepStore.dispatch({
      type: DataPrepActions.setUndoDirective,
      payload: {
        undoDirectives: [],
      },
    });
  };

  // Redux store
  const { data, headers, types, directives, undoDirectives } = dataprep;

  const handleCloseSnackbar = () => {
    const stepsArr = JSON.parse(JSON.stringify(directives));
    if (toastAction === 'add') {
      setToaster({
        open: false,
        message: '',
        isSuccess: false,
      });
      applyDirectiveAPICall(stepsArr.splice(0, stepsArr.length - 1), 'delete', [], 'undo');
    }
  };

  const handleDefaultCloseSnackbar = () => {
    setToaster({
      open: false,
      message: '',
      isSuccess: false,
    });
  };

  const setOpenColumnViewHandler = () => {
    setOpenColumnView((prev) => !prev);
  };

  const closeClickHandler = () => {
    setOpenColumnView(false);
  };

  const undoRedoFunction = (option) => {
    if (option === 'undo') {
      const last_element = directives.slice(-1);
      const newDirective = directives.slice(0, -1);
      console.log('last_element', last_element, directives, newDirective);
      DataPrepStore.dispatch({
        type: DataPrepActions.setUndoDirective,
        payload: {
          undoDirectives: undoDirectives.concat(last_element),
        },
      });
      applyDirectiveAPICall(newDirective, '', [], '');
    } else if (option === 'redo') {
      const last_element = undoDirectives.slice(-1);
      const newDirective = directives.concat(last_element);
      console.log('last_element', last_element, directives, newDirective);
      DataPrepStore.dispatch({
        type: DataPrepActions.setUndoDirective,
        payload: {
          undoDirectives: undoDirectives.slice(0, -1),
        },
      });
      applyDirectiveAPICall(newDirective, '', [], '');
    }
  };
  console.log('directives', directives, undoDirectives);
  return (
    <Box>
      {showBreadCrumb && (
        <BreadCrumb
          datasetName={workspaceName}
          location={location}
          setOpenPipeline={setOpenPipeline}
          setOpenViewSchema={setOpenViewSchema}
        />
      )}
      <ToolBarList
        columnType={columnType}
        submitMenuOption={(option, dataType) =>
          option === 'redo' || option === 'undo'
            ? undoRedoFunction(option)
            : applyDirective(option, columnSelected, dataType)
        }
        setShowBreadCrumb={setShowBreadCrumb}
        showBreadCrumb={showBreadCrumb}
      />
      {insightDrawer.open && (
        <ColumnInsightDrawer
          columnData={insightDrawer}
          onClose={() =>
            setInsightDrawer({
              open: false,
              columnName: '',
              distinctValues: 0,
              characterCount: { min: 0, max: 0 },
              dataQuality: {
                missingNullValueCount: 0,
                missingNullValuePercentage: 0,
                invalidValueCount: 0,
                invalidValuePercentage: 0,
              },
              dataQualityBar: {},
              dataTypeString: '',
              dataDistributionGraphData: [],
            })
          }
        />
      )}
      {openPipeline && <CreatePipelineModal setOpenPipeline={setOpenPipeline} />}
      {openViewSchema && (
        <ViewSchemaModal
          setOpenViewSchema={setOpenViewSchema}
          headersNamesList={headersNamesList}
        />
      )}
      {dataprep.insights.name && isFirstWrangle && connectorType === 'File' && (
        <ParsingDrawer
          updateDataTranformation={(wid) => updateDataTranformation(wid)}
          setLoading={setLoading}
        />
      )}
      {Array.isArray(gridData?.headers) && gridData?.headers.length === 0 && <NoDataScreen />}
      {showRecipePanel && (
        <RecipeSteps
          setShowRecipePanel={setShowRecipePanel}
          showRecipePanel={showRecipePanel}
          deleteRecipes={deleteRecipes}
        />
      )}
      {directiveFunction && (
        <AddTransformation
          functionName={directiveFunction}
          directiveFunctionSupportedDataType={directiveFunctionSupportedDataType}
          setLoading={setLoading}
          columnData={headersNamesList}
          missingDataList={dataQuality}
          applyTransformation={(selectedColumn, value) => {
            setColumnSelected(selectedColumn);
            applyDirective(
              optionSelected,
              selectedColumn,
              directiveFunctionSupportedDataType,
              value
            );
          }}
          callBack={(response) => {
            setColumnSelected('');
            setDirectiveFunction('');
          }}
        />
      )}

      <Box className={classes.columnViewContainer}>
        {openColumnView && (
          <Box className={classes.columnViewDrawer}>
            <ColumnView
              setLoading={setLoading}
              columnData={headersNamesList}
              dataQuality={dataQuality}
              closeClickHandler={closeClickHandler}
            />
          </Box>
        )}

        {Array.isArray(gridData?.headers) && gridData?.headers.length > 0 ? (
          <Box className={classes.gridTableWrapper}>
            <Table aria-label="simple table" className="test" data-testid="grid-table">
              <TableHead>
                <TableRow>
                  {headers.map((eachHeader) => (
                    <GridHeaderCell
                      label={eachHeader}
                      type={types[eachHeader]}
                      key={eachHeader}
                      columnSelected={columnSelected}
                      setColumnSelected={handleColumnSelect}
                      onColumnSelection={(column) => onColumnSelection(column)}
                    />
                  ))}
                </TableRow>
                <TableRow>
                  {headers.map((item, index) => (
                    <TableCell className={classes.progressBarRoot}>
                      <LinearProgress
                        variant="determinate"
                        value={progress.filter((each) => each.key === item)[0]?.value}
                        key={index}
                        classes={{
                          root: classes.MUILinearRoot,
                          barColorPrimary: classes.MUIBarColor,
                        }}
                        className={classes.linearProgressBarStyle}
                      />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {Array.isArray(missingDataList) &&
                    Array.isArray(headers) &&
                    headers.map((each, index) => {
                      return missingDataList.map((item, itemIndex) => {
                        if (item.name === each) {
                          return <GridKPICell metricData={item} key={item.name} />;
                        }
                      });
                    })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((eachRow, rowIndex) => {
                  return (
                    <TableRow key={`row-${rowIndex}`}>
                      {headers.map((eachKey, eachIndex) => {
                        return (
                          <GridTextCell
                            cellValue={eachRow[eachKey] || '--'}
                            key={`${eachKey}-${eachIndex}`}
                            maskSelection={eachKey === columnSelected ? maskSelection : false}
                            rowNumber={rowIndex}
                            columnSelected={columnSelected}
                            optionSelected={optionSelected}
                            headers={headers}
                            applyTransformation={(value) => {
                              applyDirective(
                                optionSelected,
                                columnSelected,
                                directiveFunctionSupportedDataType,
                                value
                              );
                            }}
                            cancelTransformation={() => {
                              setColumnSelected('');
                              setOptionSelected('');
                              setMaskSelection(false);
                            }}
                          />
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <NoDataScreen />
        )}
      </Box>
      <FooterPanel
        showRecipePanelHandler={showRecipePanelHandler}
        showAddTransformationHandler={showAddTransformationHandler}
        recipeStepsCount={directives?.length}
        setOpenDirective={setOpenDirective}
        dataCounts={dataCounts}
        setOpenColumnViewHandler={setOpenColumnViewHandler}
        columnViewPanelOpened={openColumnView}
      />
      {toaster.open && (
        <PositionedSnackbar
          handleDefaultCloseSnackbar={handleDefaultCloseSnackbar}
          handleCloseError={handleCloseSnackbar}
          messageToDisplay={toaster.message}
          isSuccess={toaster.isSuccess}
          actionType={toastAction}
        />
      )}
      {loading && (
        <div className={classes.loadingContainer}>
          <LoadingSVG />
        </div>
      )}
      {openDirective && (
        <DirectiveInputDrawer
          open={openDirective}
          columnNamesList={headersNamesList}
          onDirectiveInputHandler={(directives) => {
            const payload = {
              context: params.namespace,
              workspaceId: params.wid,
            };
            getWorkSpaceData(payload as IParams, wid as string, directives);
            setOpenDirective(false);
          }}
          onClose={() => setOpenDirective(false)}
        />
      )}
    </Box>
  );
}
