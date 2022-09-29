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

import { Button, Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MyDataPrepApi from 'api/dataprep';
import AddTransformation from 'components/AddTransformation';
import ColumnView from 'components/ColumnView';
import { directiveRequestBodyCreator } from 'components/DataPrep/helper';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import ParsingDrawer from 'components/ParsingDrawer';
import LoadingSVG from 'components/shared/LoadingSVG';
import { default as React, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { objectQuery } from 'services/helpers';
import BreadCrumb from './components/Breadcrumb';
import { GridHeaderCell } from './components/GridHeaderCell';
import { GridKPICell } from './components/GridKPICell';
import { GridTextCell } from './components/GridTextCell';
import { useStyles } from './styles';

const GridTable = () => {
  const { wid } = useParams() as any;
  const params = useParams() as any;
  const classes = useStyles();

  const [dataQuality, setDataQuality] = useState({});
  const [headersNamesList, setHeadersNamesList] = useState([]);
  const [rowsDataList, setRowsDataList] = useState([]);
  const [gridData, setGridData] = useState<any>({});
  const [missingDataList, setMissingDataList] = useState([]);
  const [openTranformationPanel, setOpenTransformationPanel] = useState(false);
  const [openColumnView, setOpenColumnView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidCountArray, setInvalidCountArray] = useState([
    {
      label: 'Invalid',
      count: '0',
    },
  ]);
  const [connectorType, setConnectorType] = useState(null);

  useEffect(() => {
    const { dataprep } = DataPrepStore.getState();
    setConnectorType(dataprep.connectorType);
  }, []);

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

  const convertNonNullPercent = (key, nonNullValue) => {
    const lengthOfData = gridData.values.length;
    let count = 0;
    let nonNull: any = 0;
    let empty: any = 0;
    let nullValue: any = 0;
    if (lengthOfData) {
      nonNull = nonNullValue['non-null'] ? (nonNullValue['non-null'] / 100) * lengthOfData : 0;
      nullValue = nonNullValue.null ? (nonNullValue.null / 100) * lengthOfData : 0;
      empty = nonNullValue.empty ? (nonNullValue.empty / 100) * lengthOfData : 0;
      count = parseInt(nullValue + empty);
    }
    return count;
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
            vKey == 'general' && convertNonNullPercent(key, vValue) == 0
              ? checkFrequentlyOccuredValues(key).name
              : vKey == 'general'
              ? 'Missing/Null'
              : vKey == 'types'
              ? ''
              : '',
          count:
            vKey == 'types'
              ? ''
              : convertNonNullPercent(key, vValue) == 0
              ? checkFrequentlyOccuredValues(key).count
              : convertNonNullPercent(key, vValue),
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
      setDataQuality(gridData.summary.statistics);
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

  useEffect(() => {
    getGridTableData();
  }, [gridData]);

  const closeClickHandler = () => {
    setOpenColumnView(false);
  };

  const modifyColumnsHandler = (sourceIndex, destinationIndex) => {
    const tempData = Array.from(headersNamesList);
    const [source_data] = tempData.splice(sourceIndex, 1);
    tempData.splice(destinationIndex, 0, source_data);
    setHeadersNamesList(tempData);
  };

  return (
    <Box className={classes.wrapper}>
      <BreadCrumb datasetName={wid} />
      <Button onClick={() => setOpenTransformationPanel(true)}>Open Panel</Button>
      <Button onClick={() => setOpenColumnView(true)}>Column View</Button>
      {connectorType === 'File' && <ParsingDrawer />}
      {openTranformationPanel && (
        <AddTransformation
          setLoading={setLoading}
          columnData={headersNamesList}
          callBack={(response) => {
            setGridData(response);
            setOpenColumnView(false);
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
              modifyColumnsHandler={modifyColumnsHandler}
            />
          </Box>
        )}
        <Table aria-label="simple table" className={classes.gridTableConatainer}>
          <TableHead>
            <TableRow>
              {Array.isArray(headersNamesList) &&
                headersNamesList.map((eachHeader) => (
                  <GridHeaderCell
                    label={eachHeader.label}
                    types={eachHeader.type}
                    key={eachHeader.name}
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

      {loading && (
        <div className={classes.loadingContainer}>
          <LoadingSVG />
        </div>
      )}
    </Box>
  );
};

export default GridTable;
