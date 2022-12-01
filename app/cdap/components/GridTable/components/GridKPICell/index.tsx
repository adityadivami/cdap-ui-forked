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

import { Box, Card, TableCell, Typography } from '@material-ui/core';
import React from 'react';
import { useGridKPICellStyles } from './styles';
import BarGraphContainer from 'components/GridTable/components/GridKPICell/BarGraphContainer';
import DataCellContainer from 'components/GridTable/components/GridKPICell/DataCell';

export default function GridKPICell({ metricData, dataVisualization, columnDataType }) {
  const classes = useGridKPICellStyles();
  const metricValue = metricData;
  const FinalizedDistinctConstant = 15;
  const isShowBarChart = dataVisualization.distinctValues < FinalizedDistinctConstant

  const BarGraphDisplay = (
    <BarGraphContainer graphData={dataVisualization.dataDistributionGraphData}
      distinctValues={dataVisualization.distinctValues} />
  )

  const displayTextCount = metricValue?.map((eachValue: { label: string; count: number }) => {
    return (<>
      {
        columnDataType.includes("Boolean") && BarGraphDisplay
      }
      {
        columnDataType.includes("String") && <DataCellContainer eachValue={eachValue} />
      }
      {
        (columnDataType.includes("Int") || columnDataType.includes("Short") || columnDataType.includes("Long")) && <DataCellContainer eachValue={eachValue} />
      }
      {
        (columnDataType.includes("Float") || columnDataType.includes("Decimal") || columnDataType.includes("Double")) && <DataCellContainer eachValue={eachValue} />
      }
      {
        columnDataType.includes("Bytes") && <DataCellContainer eachValue={eachValue} />
      }</>
    )
  }
  )
  return (
    <>
      <TableCell className={classes.tableHeaderCell}>
        <Card className={classes.root} variant="outlined">
          <>
            {
              columnDataType.includes("Boolean") && BarGraphDisplay
            }
            {
              columnDataType.includes("String") && (isShowBarChart ? BarGraphDisplay : displayTextCount)
            }
            {
              (columnDataType.includes("Int") || columnDataType.includes("Short") || columnDataType.includes("Long")) && (isShowBarChart ? BarGraphDisplay : displayTextCount)
            }
            {
              (columnDataType.includes("Float") || columnDataType.includes("Decimal") || columnDataType.includes("Double")) && (isShowBarChart ? BarGraphDisplay : displayTextCount)
            }
            {
              columnDataType.includes("Bytes") && (isShowBarChart ? BarGraphDisplay : displayTextCount)
            }</>
        </Card>
      </TableCell>
    </>
  );
}
