import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { COLUMNS, NULL_VALUES } from '../constants';
import { useStyles } from './styles';
import { prepareDataQualtiy } from './CircularProgressBar/utils';
import DataQualityProgress from './CircularProgressBar';

const SelectColumnsList = (props) => {
  const { columnData, dataQuality, searchTerm } = props;
  const [filteredColumns, setFilteredColumns] = useState(columnData);
  const classes = useStyles();
  const [dataQualityValue, setDataQualityValue] = useState(dataQuality);

  useEffect(() => {
    const getPreparedDataQuality = prepareDataQualtiy(dataQuality, columnData);
    setDataQualityValue(getPreparedDataQuality);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const columnValue = columnData.filter((el) =>
        el?.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (columnValue.length) {
        setFilteredColumns(columnValue);
      } else {
        setFilteredColumns([]);
      }
    } else {
      setFilteredColumns(columnData);
    }
  }, [searchTerm]);

  return (
    <section className={classes.columnsCountTextStyles}>
      <TableContainer component={Box} classes={{ root: classes.customTableContainer }}>
        <Table aria-label="recipe steps table" stickyHeader>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.recipeStepsTableRowStyles}>
              <TableCell className={classes.columnLeft}>
                {`${COLUMNS} (${columnData.length})`}
              </TableCell>
              <TableCell className={classes.columnRight}>{NULL_VALUES}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {filteredColumns.map((eachColumn, index) => (
              <>
                <TableRow key={index} className={classes.tableRowContainer}>
                  <TableCell className={classes.leftSideCell}>
                    <Box>
                      {eachColumn.label}
                      &nbsp;
                      <br />
                      {eachColumn.type}
                    </Box>
                  </TableCell>
                  <TableCell className={classes.nullValuesContainer}>
                    {dataQualityValue?.length && (
                      <DataQualityProgress value={dataQualityValue[index]?.value} />
                    )}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default SelectColumnsList;
