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
import ToolBarList from 'components/GridTable/components/TransfomationToolbar';
import BreadCrumb from './components/Breadcrumb';
import GridHeaderCell from './components/GridHeaderCell';
import GridKPICell from './components/GridKPICell';
import GridTextCell from './components/GridTextCell';
import { useStyles } from './styles';
import {
  IExecuteAPIResponse,
  IHeaderNamesList,
  IObject,
  IParams,
  IRecords,
  IDataQuality,
  IRowData,
  IMissingListData,
  IGridParams,
  IRequestBody,
  IApiPayload,
} from './types';
import { convertNonNullPercent } from './utils';
import AddTransformation from 'components/AddTransformation';
import { getAPIRequestPayload } from './services';

export default function GridTable() {
  const { wid } = useParams() as IRecords;

  const params = useParams() as IRecords;
  const location = useLocation();

  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(false);
  const [headersNamesList, setHeadersNamesList] = useState<IHeaderNamesList[]>([]);
  const [rowsDataList, setRowsDataList] = useState<IRowData[]>([]);
  const [gridData, setGridData] = useState<IExecuteAPIResponse>();
  const [missingDataList, setMissingDataList] = useState<IMissingListData[]>([]);
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [invalidCountArray, setInvalidCountArray] = useState<Array<Record<string, string>>>([
    {
      label: 'Invalid',
      count: '0',
    },
  ]);
  const [showBreadCrumb, setShowBreadCrumb] = useState<boolean>(true);
  const [directiveFunction, setDirectiveFunction] = useState<string>('');
  const [directiveFunctionSupportedDataType, setDirectiveFunctionSupportedDataType] = useState<
    string[]
  >([]);
  const [dataQuality, setDataQuality] = useState<IDataQuality>({});
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
    const headersData: IHeaderNamesList[] = createHeadersData(
      rawData.headers,
      rawData.types
    ) as IHeaderNamesList[];
    setHeadersNamesList(headersData);
    if (rawData && rawData?.summary && rawData?.summary?.statistics) {
      const missingData: IMissingListData[] = createMissingData(gridData?.summary?.statistics);
      setMissingDataList(missingData);
      setDataQuality(gridData?.summary?.statistics);
    }
    const rowData: IRowData[] =
      rawData &&
      rawData.values &&
      Array.isArray(rawData?.values) &&
      (rawData?.values.map((eachRow: {}) => {
        const { ...rest } = eachRow;
        return rest;
      }) as IRowData[]);

    setRowsDataList(rowData);
  };

  useEffect(() => {
    getGridTableData();
  }, [gridData]);

  // ------------@onMenuOptionSelection Function is used to set option selected from toolbar and then calling of execute API
  const onMenuOptionSelection = (option: string, supported_dataType: string[]) => {
    setDirectiveFunction(option);
    setDirectiveFunctionSupportedDataType(supported_dataType);
  };

  const applyDirectives = (directive: string) => {
    setLoading(true);
    if (directive) {
      const apiPayload: IApiPayload = getAPIRequestPayload(params, directive, '');
      executeAPICall(apiPayload);
    } else {
      setLoading(false);
      setDirectiveFunction('');
    }
  };

  const executeAPICall = (apiPayload: IApiPayload) => {
    const payload: IRecords = apiPayload.payload;
    const requestBody: IRequestBody = apiPayload.requestBody;
    const gridParams: IGridParams = apiPayload.gridParams;
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
      },
      (err) => {
        setLoading(false);
      }
    );
  };

  return (
    <Box>
      {showBreadCrumb && <BreadCrumb datasetName={workspaceName} location={location} />}
      <ToolBarList
        setShowBreadCrumb={setShowBreadCrumb}
        showBreadCrumb={showBreadCrumb}
        columnType={'int'} // TODO: column type needs to be send dynamically after integrating with transfomations branch
        submitMenuOption={(option, datatype) => {
          onMenuOptionSelection(option, datatype);
        }}
      />
      {Array.isArray(gridData?.headers) && gridData?.headers.length === 0 && (
        <NoRecordScreen
          title={T.translate('features.NoRecordScreen.gridTable.title')}
          subtitle={T.translate('features.NoRecordScreen.gridTable.subtitle')}
        />
      )}
      <Table aria-label="simple table" className="test" data-testid="grid-table">
        <TableHead>
          <TableRow>
            {headersNamesList?.length > 0 &&
              headersNamesList.map((eachHeader) => (
                <GridHeaderCell
                  label={eachHeader.label}
                  types={eachHeader.type as string[]}
                  key={eachHeader.name}
                />
              ))}
          </TableRow>
          <TableRow>
            {missingDataList?.length > 0 &&
              headersNamesList.length > 0 &&
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
          {rowsDataList?.length > 0 &&
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
      {directiveFunction && (
        <AddTransformation
          functionName={directiveFunction}
          directiveFunctionSupportedDataType={directiveFunctionSupportedDataType}
          columnData={headersNamesList}
          missingDataList={dataQuality}
          callBack={() => {
            setDirectiveFunction('');
          }}
          applyTransformation={(directive: string) => {
            applyDirectives(directive);
          }}
        />
      )}
      {loading && (
        <div className={classes.loadingContainer}>
          <LoadingSVG />
        </div>
      )}
    </Box>
  );
}
