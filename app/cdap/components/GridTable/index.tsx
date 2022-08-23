import { Box, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { default as React, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BreadCumb from './components/Breadcrumb';
import { GridHeaderCell } from './components/GridHeaderCell';
import { GridKPICell } from './components/GridKPICell';
import { GridTextCell } from './components/GridTextCell';
import mockJSON from './mock/apiMock';
import metricsJSON from './mock/metrics';
import MyDataPrepApi from 'api/dataprep';

const GridTable = () => {
  const { datasetName } = useParams() as any;

  const [headersNamesList, setHeadersNamesList] = React.useState([]);
  const [rowsDataList, setRowsDataList] = React.useState([]);

  const [ongoingExpDatas, setOngoingExpDatas] = useState<any>([]);
  const [finalArray, setFinalArray] = useState([]);

  const getOngoingData = () => {
    MyDataPrepApi.getWorkspaceList({
      context: 'default',
    }).subscribe((res) => {
      res.values.forEach((item) => {
        const params = {
          context: 'default',
          workspaceId: item.workspaceId,
        };
        const requestBody = {
          directives: item.directives,
          limit: 1000,
          insights: {
            name: item.name,
            workspaceName: item.workspaceName,
            path: item?.sampleSpec?.path,
            visualization: {},
          },
        };
        MyDataPrepApi.execute(params, requestBody).subscribe((response) => {
          console.log('response', response);
          let dataQuality = 0;
          response.headers.forEach((head) => {
            const general = response.summary.statistics[head].general;
            const { empty: empty = 0, 'non-null': nonEmpty = 100 } = general;
            const nonNull = Math.floor((nonEmpty - empty) * 10) / 10;
            dataQuality = dataQuality + nonNull;
          });

          const totalDataQuality = dataQuality / response.headers.length;

          setOngoingExpDatas((current) => [
            ...current,
            {
              connectionName:
                item?.sampleSpec?.connectionName === undefined
                  ? 'Upload'
                  : item?.sampleSpec?.connectionName,
              workspaceName: item.workspaceName,
              recipeSteps: item.directives.length,
              dataQuality: totalDataQuality,
            },
          ]);
        });
      });
    });
  };

  useEffect(() => {
    getOngoingData();
  }, []);

  const createHeadersData = (columnNamesList, columnLabelsList, columnTypesList) => {
    return columnNamesList
      .map((eachColumnName) => {
        return {
          name: eachColumnName,
          label: columnLabelsList[eachColumnName],
          type: [columnTypesList[eachColumnName]],
        };
      })
      .slice(1);
  };

  const getGridTableData = async () => {
    const fetchedResponse = await mockJSON;
    const rawData = fetchedResponse.response;

    const headersData = createHeadersData(rawData.headers, rawData.values[0], rawData.types);
    setHeadersNamesList(headersData);

    const rowData = rawData.values.slice(1).map((eachRow) => {
      const { body, ...rest } = eachRow;
      return rest;
    });

    setRowsDataList(rowData);
  };

  useEffect(() => {
    getGridTableData();
  }, []);

  return (
    <>
      <BreadCumb datasetName={datasetName} />
      <TableContainer component={Box}>
        <Table aria-label="simple table" className="test">
          <TableHead>
            <TableRow>
              {headersNamesList.map((eachHeader) => (
                <GridHeaderCell
                  label={eachHeader.label}
                  types={eachHeader.type}
                  key={eachHeader.name}
                />
              ))}
            </TableRow>
            <TableRow>
              {metricsJSON.map((each) => (
                <GridKPICell metricData={each} key={each.name} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsDataList.map((eachRow, rowIndex) => (
              <TableRow key={`row-${rowIndex}`}>
                {Object.keys(eachRow).map((eachKey, keyIndex) => (
                  <GridTextCell cellValue={eachRow[eachKey]} key={`${eachKey}-${keyIndex}`} />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GridTable;
