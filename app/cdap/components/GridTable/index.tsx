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

import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MyDataPrepApi from 'api/dataprep';
import ColumnInsights from 'components/ColumnInsights';
import { directiveRequestBodyCreator } from 'components/DataPrep/helper';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import LoadingSVG from 'components/shared/LoadingSVG';
import PositionedSnackbar from 'components/SnackbarComponent';
import { IValues } from 'components/WrangleHome/Components/OngoingDataExploration/types';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { flatMap } from 'rxjs/operators';
import { objectQuery } from 'services/helpers';
import BreadCrumb from './components/Breadcrumb';
import GridHeaderCell from './components/GridHeaderCell';
import GridKPICell from './components/GridKPICell';
import GridTextCell from './components/GridTextCell';
import NoDataScreen from './components/NoRecordScreen';
import { useStyles } from 'components/GridTable/styles';
import {
  IExecuteAPIResponse,
  IHeaderNamesList,
  IInsightDrawer,
  IObject,
  IParams,
  IRecords,
  IToaster,
} from 'components/GridTable/types';
import {
  calculateDistinctValues,
  calculateDistributionGraphData,
  calculateEmptyValueCount,
  characterCount,
  checkAlphaNumericAndSpaces,
  convertNonNullPercent,
  getColumnNames,
} from 'components/GridTable/utils';

export default function() {
  const { wid } = useParams() as IRecords;
  const params = useParams() as IRecords;
  const classes = useStyles();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const { dataprep } = DataPrepStore.getState();
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [headersNamesList, setHeadersNamesList] = useState<IHeaderNamesList[]>([]);
  const [rowsDataList, setRowsDataList] = useState([]);
  const [gridData, setGridData] = useState({} as IExecuteAPIResponse);
  const [missingDataList, setMissingDataList] = useState([]);
  const [columnType, setColumnType] = useState<string>('');
  const [toaster, setToaster] = useState<IToaster>({
    open: false,
    message: '',
    isSuccess: false,
  });
  const [insightDrawer, setInsightDrawer] = useState<IInsightDrawer>({
    open: false,
    columnName: '',
    distinctValues: 0,
    characterCount: {
      min: 0,
      max: 0,
    },
    dataQuality: {
      nullValueCount: 0,
      nullValuePercentage: 0,
      emptyValueCount: 0,
      emptyValuePercentage: 0,
    },
    dataQualityBar: {},
    dataTypeString: '',
    dataDistributionGraphData: [],
    columnNamesList: [],
  });
  const [columnSelected, setColumnSelected] = useState('');
  const [invalidCountArray, setInvalidCountArray] = useState([
    {
      label: 'Invalid',
      count: '0',
    },
  ]);

  const getWorkSpaceData = (params: IParams, workspaceId: string) => {
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
          return MyDataPrepApi.execute(params, requestBody);
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

  const handleColumnSelect = (columnName: string) => {
    setColumnSelected((prevColumn) => (prevColumn === columnName ? '' : columnName));
    setColumnType(types[columnName]);
  };
  const { types } = dataprep;

  const renameColumnNameHandler = (oldColumnName: string, newColumnName: string) => {
    const directive = `rename ${oldColumnName} ${newColumnName}`;
    setColumnSelected(newColumnName);
    applyDirectiveAPICall(directive, 'add', [], 'insightsPanel');
  };

  const applyDirectiveAPICall = (newDirective: string, action, removed_arr, from) => {
    setLoading(true);
    const { dataprep } = DataPrepStore.getState();
    const { workspaceId, workspaceUri, directives, insights } = dataprep;
    let gridParams = {};
    const updatedDirectives = directives.concat(newDirective);
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
        setGridData(response);
        if (!insightDrawer.open) {
          setColumnSelected('');
        } else {
          setLoading(true);
        }
        setLoading(false);
      },
      (err) => {
        setToaster({
          open: true,
          message: `Failed to transform ${newDirective}`,
          isSuccess: false,
        });
        setLoading(false);
      }
    );
    setToaster({
      open: false,
      message: '',
      isSuccess: false,
    });
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
    const headersData = createHeadersData(rawData?.headers, rawData?.types);
    setHeadersNamesList(headersData);
    if (rawData && rawData?.summary && rawData?.summary?.statistics) {
      const missingData = createMissingData(gridData?.summary?.statistics);
      setMissingDataList(missingData);
    }
    const rowData =
      rawData &&
      rawData?.values &&
      Array.isArray(rawData?.values) &&
      rawData?.values.map((eachRow: {}) => {
        const { ...rest } = eachRow;
        return rest;
      });
    setRowsDataList(rowData);
  };

  const dataTypeHandler = (dataType: string) => {
    const newDirective = `set-type ${columnSelected} ${dataType}`;
    applyDirectiveAPICall(newDirective, 'add', [], 'insightsPanel');
  };

  const onColumnSelection = (columnName: string) => {
    const getDistinctValue = calculateDistinctValues(rowsDataList, columnName);
    const getCharacterCountOfCell = characterCount(rowsDataList, columnName);
    const getNullValueCount =
      convertNonNullPercent(
        gridData,
        columnName,
        gridData?.summary?.statistics[columnName]?.general
      ) || 0;
    const getDataTypeString = checkAlphaNumericAndSpaces(rowsDataList, columnName);
    setInsightDrawer({
      open: true,
      columnName,
      distinctValues: getDistinctValue,
      characterCount: getCharacterCountOfCell,
      dataQuality: {
        nullValueCount: Number(getNullValueCount),
        nullValuePercentage: Number(
          ((Number(Number(getNullValueCount).toFixed(0)) / rowsDataList?.length) * 100).toFixed(0)
        ),
        emptyValueCount: calculateEmptyValueCount(rowsDataList, columnName),
        emptyValuePercentage: Number(
          (
            (Number(Number(calculateEmptyValueCount(rowsDataList, columnName)).toFixed(0)) /
              rowsDataList?.length) *
            100
          ).toFixed(0)
        ),
      },
      dataQualityBar: gridData?.summary?.statistics[columnName],
      dataTypeString: getDataTypeString,
      dataDistributionGraphData: calculateDistributionGraphData(rowsDataList, columnName),
      columnNamesList: getColumnNames(rowsDataList),
    });
  };

  useEffect(() => {
    getGridTableData();
  }, [gridData]);

  useEffect(() => {
    if (insightDrawer.open) {
      onColumnSelection(columnSelected);
    }
    setLoading(false);
  }, [rowsDataList]);

  return (
    <Box>
      <BreadCrumb datasetName={workspaceName} location={location} />
      {insightDrawer.open && (
        <ColumnInsights
          columnType={columnType}
          columnData={insightDrawer}
          renameColumnNameHandler={renameColumnNameHandler}
          dataTypeHandler={dataTypeHandler}
          onClose={() => {
            setInsightDrawer({
              open: false,
              columnName: '',
              distinctValues: 0,
              characterCount: { min: 0, max: 0 },
              dataQuality: {
                nullValueCount: 0,
                nullValuePercentage: 0,
                emptyValueCount: 0,
                emptyValuePercentage: 0,
              },
              dataQualityBar: {},
              dataTypeString: '',
              dataDistributionGraphData: [],
              columnNamesList: [],
            });
            setColumnSelected('');
          }}
        />
      )}
      {gridData && Array.isArray(gridData?.headers) && gridData?.headers?.length === 0 && (
        <NoDataScreen />
      )}
      <Table aria-label="simple table" className="test" data-testid="grid-table">
        <TableHead>
          <TableRow>
            {headersNamesList &&
              Array.isArray(headersNamesList) &&
              headersNamesList?.length > 0 &&
              headersNamesList.map((eachHeader, index) => (
                <GridHeaderCell
                  label={eachHeader.label}
                  type={eachHeader.type as string[]}
                  key={eachHeader.name}
                  columnSelected={columnSelected}
                  setColumnSelected={handleColumnSelect}
                  onColumnSelection={(column) => onColumnSelection(column)}
                  index={index}
                />
              ))}
          </TableRow>
          <TableRow>
            {missingDataList &&
              Array.isArray(missingDataList) &&
              missingDataList?.length > 0 &&
              headersNamesList &&
              headersNamesList?.length > 0 &&
              headersNamesList.map((each, index) => {
                return missingDataList.map((item, itemIndex) => {
                  if (item.name == each.name) {
                    return <GridKPICell metricData={item} key={item.name} />;
                  }
                });
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsDataList &&
            Array.isArray(rowsDataList) &&
            rowsDataList?.length > 0 &&
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
      {toaster.open && (
        <PositionedSnackbar messageToDisplay={toaster.message} isSuccess={toaster.isSuccess} />
      )}
      {loading && (
        <div className={classes.loadingContainer}>
          <LoadingSVG />
        </div>
      )}
    </Box>
  );
}
