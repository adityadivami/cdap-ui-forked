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

import { Box, Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import MyDataPrepApi from 'api/dataprep';
import { directiveRequestBodyCreator } from 'components/DataPrep/helper';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import NoRecordScreen from 'components/NoRecordScreen/index';
import LoadingSVG from 'components/shared/LoadingSVG';
import { IValues } from 'components/WrangleHome/Components/OngoingDataExplorations/types';
import T from 'i18n-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { flatMap } from 'rxjs/operators';
import { objectQuery } from 'services/helpers';
import ToolBarList from 'components/GridTable/components/TransformationToolbar';
import BreadCrumb from 'components/GridTable/components/Breadcrumb';
import GridHeaderCell from 'components/GridTable/components/GridHeaderCell';
import GridKPICell from 'components/GridTable/components/GridKPICell';
import GridTextCell from 'components/GridTable/components/GridTextCell';
import { useStyles } from 'components/GridTable/styles';
import {
  IExecuteAPIResponse,
  IHeaderNamesList,
  IObject,
  IParams,
  IRecords,
} from 'components/GridTable/types';
import { convertNonNullPercent } from 'components/GridTable/utils';

export default function GridTable() {
  const { wid } = useParams() as IRecords;

  const params = useParams() as IRecords;
  const location = useLocation();

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [headerNamesList, setheaderNamesList] = useState<IHeaderNamesList[]>([]);
  const [rowsDataList, setRowsDataList] = useState([]);
  const [gridData, setGridData] = useState({} as IExecuteAPIResponse);
  const [missingDataList, setMissingDataList] = useState([]);
  const [workspaceName, setWorkspaceName] = useState('');
  const [invalidCountArray, setInvalidCountArray] = useState([
    {
      label: 'Invalid',
      count: '0',
    },
  ]);
  const [showBreadCrumb, setShowBreadCrumb] = useState<boolean>(true);

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
          type: [columnTypesList[eachColumnName]],
        };
      });
    }
  };

  // ------------@createMissingData Function is used for preparing data for second row of Table which shows Missing/Null Value
  const createMissingData = (statistics: IObject) => {
    const statisticObjectToArray = Object.entries(statistics);
    const metricArray = [];
    statisticObjectToArray.forEach(([key, value]) => {
      const headerKeyTypeArray = Object.entries(value);
      const typeArrayOfMissingValue = [];
      headerKeyTypeArray.forEach(([vKey, vValue]) => {
        typeArrayOfMissingValue.push({
          label: vKey === 'general' ? 'Missing/Null' : '',
          count: vKey === 'types' ? '' : convertNonNullPercent(gridData, vValue),
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
    setheaderNamesList(headersData);
    if (rawData && rawData?.summary && rawData?.summary?.statistics) {
      const missingData = createMissingData(gridData?.summary?.statistics);
      setMissingDataList(missingData);
    }
    const rowData =
      rawData &&
      rawData.values &&
      Array.isArray(rawData?.values) &&
      rawData?.values.map((eachRow: {}) => {
        const { ...rest } = eachRow;
        return rest;
      });

    setRowsDataList(rowData);
  };

  useEffect(() => {
    getGridTableData();
  }, [gridData]);

  return (
    <Box>
      {showBreadCrumb && <BreadCrumb datasetName={workspaceName} location={location} />}
      <ToolBarList
        setShowBreadCrumb={setShowBreadCrumb}
        showBreadCrumb={showBreadCrumb}
        columnType={'string'} // TODO: column type needs to be send dynamically after integrating with transfomations branch
        submitMenuOption={(option, datatype) => {
          return false;
          // TODO: will integrate with add transformation panel later
        }}
      />

      {gridData?.headers.length === 0 && (
        <NoRecordScreen
          title={T.translate('features.NoRecordScreen.gridTable.title')}
          subtitle={T.translate('features.NoRecordScreen.gridTable.subtitle')}
        />
      )}
      <Table aria-label="simple table" className="test" data-testid="grid-table">
        <TableHead>
          <TableRow>
            {headerNamesList?.length > 0 &&
              headerNamesList.map((eachHeaderName) => (
                <GridHeaderCell
                  label={eachHeaderName.label}
                  types={eachHeaderName.type as string[]}
                  key={eachHeaderName.name}
                />
              ))}
          </TableRow>
          <TableRow>
            {missingDataList?.length > 0 &&
              headerNamesList.length > 0 &&
              headerNamesList.map((eachHeaderName) => {
                return missingDataList.map((eachMissingData) => {
                  if (eachMissingData.name === eachHeaderName.name) {
                    return <GridKPICell metricData={eachMissingData} key={eachMissingData.name} />;
                  }
                });
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsDataList?.length > 0 &&
            rowsDataList.map((eachRow, rowIndex) => {
              return (
                <TableRow key={`row-${rowIndex}`}>
                  {headerNamesList.map((eachHeaderName, eachIndex) => {
                    return (
                      <GridTextCell
                        cellValue={eachRow[eachHeaderName.name] || '--'}
                        key={`${eachHeaderName.name}-${eachIndex}`}
                      />
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {loading && (
        <div className={classes.loadingContainer}>
          <LoadingSVG />
        </div>
      )}
    </Box>
  );
}
