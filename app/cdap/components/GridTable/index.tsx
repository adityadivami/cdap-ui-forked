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
import MyDataPrepApi from 'api/dataprep';
import { directiveRequestBodyCreator } from 'components/DataPrep/helper';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import { default as React, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { objectQuery } from 'services/helpers';
import BreadCrumb from './components/Breadcrumb';
import { GridHeaderCell } from './components/GridHeaderCell';
import { GridKPICell } from './components/GridKPICell';
import { GridTextCell } from './components/GridTextCell';
import Box from '@material-ui/core/Box';
import { useStyles } from './styles';
import ParsingDrawer from 'components/ParsingDrawer';
import ColumnInsightDrawer from 'components/ColumnInsights';
import {
  calculateDistinctValues,
  characterCount,
  convertNonNullPercent,
  checkAlphaNumericAndSpaces,
} from './utils';

const GridTable = () => {
  const { wid } = useParams() as any;
  const params = useParams() as any;
  const classes = useStyles();

  const [headersNamesList, setHeadersNamesList] = React.useState([]);
  const [rowsDataList, setRowsDataList] = React.useState([]);
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
    dataTypeString: '',
  });
  const [invalidCountArray, setInvalidCountArray] = useState([
    {
      label: 'Invalid',
      count: '0',
    },
  ]);

  const getWorkSpaceData = (params, workspaceId) => {
    DataPrepStore.dispatch({
      type: DataPrepActions.setWorkspaceId,
      payload: {
        workspaceId,
        loading: true,
      },
    });
    MyDataPrepApi.getWorkspace(params).subscribe((res) => {
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

      MyDataPrepApi.execute(params, requestBody).subscribe((response) => {
        DataPrepStore.dispatch({
          type: DataPrepActions.setWorkspace,
          payload: {
            data: response.values,
            headers: response.headers,
            types: response.types,
            directives,
            workspaceId,
            workspaceUri,
            workspaceInfo,
            insights,
          },
        });
        setGridData(response);
      });
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

  const createHeadersData = (columnNamesList: any, columnLabelsList, columnTypesList) => {
    if (Array.isArray(columnNamesList)) {
      return columnNamesList.map((eachColumnName) => {
        return {
          name: eachColumnName,
          label: eachColumnName,
          type: [columnTypesList[eachColumnName]],
        };
      });
    }
  };

  const checkFrequentlyOccuredValues = (key) => {
    const valueOfKey = gridData.values.map((el) => el[key]);
    let mostfrequentItem = 1;
    let count = 0;
    let item = '';
    const data = {
      name: '',
      count: 0,
    };
    for (let i = 0; i < valueOfKey.length; i++) {
      for (let j = i; j < valueOfKey.length; j++) {
        if (valueOfKey[i] == valueOfKey[j]) {
          count++;
        }
        if (mostfrequentItem < count) {
          mostfrequentItem = count;
          item = valueOfKey[i];
        }
      }
      count = 0;
      item = item == '' ? valueOfKey[i] : item;
    }
    data.name = item;
    data.count = mostfrequentItem;
    return data;
  };

  const createMissingData = (statistics) => {
    const objectArray = Object.entries(statistics);
    const metricArray = [];
    objectArray.forEach(([key, value]) => {
      const valueToArray = Object.entries(value);
      const tempArray = [];
      valueToArray.forEach(([vKey, vValue]) => {
        tempArray.push({
          label:
            vKey == 'general' && convertNonNullPercent(gridData, key, vValue) == 0
              ? checkFrequentlyOccuredValues(key).name
              : vKey == 'general'
              ? 'Missing/Null'
              : vKey == 'types'
              ? ''
              : '',
          count:
            vKey == 'types'
              ? ''
              : convertNonNullPercent(gridData, key, vValue) == 0
              ? checkFrequentlyOccuredValues(key).count
              : convertNonNullPercent(gridData, key, vValue),
        });
      }),
        metricArray.push({
          name: key,
          values: tempArray.concat(invalidCountArray),
        });
    });
    return metricArray;
  };

  const getGridTableData = async () => {
    const rawData: any = gridData;
    const headersData = createHeadersData(rawData.headers, rawData.headers, rawData.types);
    setHeadersNamesList(headersData);
    if (rawData && rawData.summary && rawData.summary.statistics) {
      const missingData = createMissingData(gridData.summary.statistics);
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

    setRowsDataList(rowData);
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
        missingNullValueCount: getMissingValueCount,
        missingNullValuePercentage: (getMissingValueCount / rowsDataList.length) * 100,
        invalidValueCount: 0,
        invalidValuePercentage: 0,
      },
      dataTypeString: getDataTypeString,
    });
  };

  useEffect(() => {
    getGridTableData();
  }, [gridData]);

  return (
    <Box className={classes.wrapper}>
      <BreadCrumb datasetName={wid} />
      <ParsingDrawer />
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
              dataTypeString: '',
            })
          }
        />
      )}
      <Table aria-label="simple table" className="test">
        <TableHead>
          <TableRow>
            {Array.isArray(headersNamesList) &&
              headersNamesList.map((eachHeader) => (
                <GridHeaderCell
                  label={eachHeader.label}
                  types={eachHeader.type}
                  key={eachHeader.name}
                  onColumnSelection={(column) => onColumnSelection(column)}
                />
              ))}
          </TableRow>
          <TableRow>
            {Array.isArray(missingDataList) &&
              Array.isArray(headersNamesList) &&
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
          {Array.isArray(rowsDataList) &&
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
    </Box>
  );
};

export default GridTable;
