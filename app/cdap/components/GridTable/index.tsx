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

import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MyDataPrepApi from 'api/dataprep';
import { directiveRequestBodyCreator } from 'components/DataPrep/helper';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import BreadCrumb from 'components/GridTable/components/Breadcrumb';
import GridHeaderCell from 'components/GridTable/components/GridHeaderCell';
import GridKPICell from 'components/GridTable/components/GridKPICell';
import GridTextCell from 'components/GridTable/components/GridTextCell';
import { useStyles } from 'components/GridTable/styles';
import {
  IExecuteAPIResponse,
  IGeneral,
  IHeaderNamesList,
  IParams,
  IRecords,
  IStatistics,
  IType,
} from 'components/GridTable/types';
import NoRecordScreen from 'components/NoRecordScreen';
import LoadingSVG from 'components/shared/LoadingSVG';
import { IValues } from 'components/WrangleHome/Components/OngoingDataExploration/types';
import T from 'i18n-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { flatMap } from 'rxjs/operators';
import { objectQuery } from 'services/helpers';
import {
  calculateDistinctValues,
  calculateDistributionGraphData,
  calculateEmptyValueCount,
  characterCount,
  checkAlphaNumericAndSpaces,
  convertNonNullPercentForColumnSelected,
  getColumnNames,
} from './utils';
import styled from 'styled-components';
import { grey, red } from '@material-ui/core/colors';

const ProgressBarTableCell = styled(TableCell)`
  padding: 0px;
`;

const StyledLinearProgress = styled(LinearProgress)`
  background-color: ${red.A100};
  height: 6px;

  & .MuiLinearProgress-barColorPrimary {
    background-color: ${grey[300]};
  }
`;

export default function GridTable() {
  const { wid } = useParams() as IRecords;
  const params = useParams() as IRecords;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState([]);
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

  const calculateMetaData = (columnName: string) => {
    const getDistinctValue = calculateDistinctValues(rowsDataList, columnName);
    const getCharacterCountOfCell = characterCount(rowsDataList, columnName);
    const getNullValueCount =
      convertNonNullPercentForColumnSelected(
        gridData?.values,
        (gridData?.summary?.statistics[columnName] as Record<string, IType>)?.general
      ) || 0;
    const getDataTypeString = checkAlphaNumericAndSpaces(rowsDataList, columnName);
    const insightDrawerData = {
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
    };
    return insightDrawerData;
  };

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
    getWorkSpaceData(payload as IParams, wid as string);
  }, [wid]);

  // ------------@createHeadersData Function is used for creating data of Table Header
  const createHeadersData = (columnNamesList: string[], columnTypesList: IRecords) => {
    if (Array.isArray(columnNamesList)) {
      return columnNamesList.map((eachColumnName: string) => {
        return {
          name: eachColumnName,
          label: eachColumnName,
          type: [columnTypesList[eachColumnName]] as string[],
        };
      });
    }
  };

  // ------------@createMissingData Function is used for preparing data for second row of Table which shows Missing/Null Value
  const createMissingData = (statistics: IStatistics | IGeneral) => {
    const statisticObjectToArray = Object.entries(statistics);
    const metricArray = [];
    statisticObjectToArray.forEach(([key, value]) => {
      const calculatedMetaData = calculateMetaData(key);
      const emptyValueCount = calculatedMetaData.dataQuality.emptyValueCount;
      const nullValueCount = calculatedMetaData.dataQuality.nullValueCount;
      const emptyData = {
        label: 'Empty',
        count: emptyValueCount,
      };
      const nullData = {
        label: 'Null',
        count: nullValueCount,
      };

      const metricData = {
        name: calculatedMetaData.columnName,
        data: [emptyData, nullData],
      };

      metricArray.push(metricData);
    });
    return metricArray;
  };

  // ------------@getGridTableData Function is used for preparing data for entire grid-table
  const getGridTableData = async () => {
    const rawData: IExecuteAPIResponse = gridData;
    const headersData = createHeadersData(rawData.headers, rawData.types);
    setHeadersNamesList(headersData);

    const progressValues = [];
    const updatedStatistics = gridData?.summary?.statistics;
    for (const title in gridData?.summary?.statistics) {
      const { general } = updatedStatistics[title] || {};
      const empty = general?.empty || 0;
      const nonNull = general['non-null'] || 0;
      const filled = nonNull - empty;
      progressValues.push({ value: filled, key: title });
    }
    setProgress(progressValues);
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
    const missingData =
      gridData?.summary?.statistics && createMissingData(gridData?.summary?.statistics);
    setMissingDataList(missingData);
  }, [rowsDataList]);

  useEffect(() => {
    getGridTableData();
  }, [gridData]);

  return (
    <Box data-testid="grid-table-container">
      <BreadCrumb datasetName={wid} />
      {Array.isArray(gridData?.headers) && gridData?.headers.length === 0 ? (
        <NoRecordScreen
          title={T.translate('features.WranglerNewUI.NoRecordScreen.gridTable.title')}
          subtitle={T.translate('features.WranglerNewUI.NoRecordScreen.gridTable.subtitle')}
        />
      ) : (
        <Table aria-label="simple table" className="test">
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
              {headersNamesList?.length &&
                headersNamesList.map((item, index) => (
                  <ProgressBarTableCell>
                    <StyledLinearProgress
                      variant="determinate"
                      value={
                        progress.filter((progressItem) => {
                          return progressItem.key === item.name;
                        })[0]?.value
                      }
                      key={index}
                    />
                  </ProgressBarTableCell>
                ))}
            </TableRow>
            <TableRow>
              {missingDataList?.length &&
                headersNamesList.length &&
                headersNamesList.map((each, index) => {
                  return missingDataList.map((item, itemIndex) => {
                    if (item.name === each.name) {
                      return <GridKPICell metricData={item.data} key={item.name} />;
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
                          cellValue={eachRow[eachKey.name]}
                          key={`${eachKey.name}-${eachIndex}`}
                        />
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
      {loading && (
        <div className={classes.loadingContainer}>
          <LoadingSVG />
        </div>
      )}
    </Box>
  );
}
