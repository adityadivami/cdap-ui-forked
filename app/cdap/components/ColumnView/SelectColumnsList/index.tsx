import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import { COLUMNS, NULL_VALUES } from '../constants';
import { useStyles } from '../styles';
import { HoverDots, PlaceHolderIcon } from './icons';

const SelectColumnsList = (props) => {
  const { columnData } = props;
  const [columns, setColumns] = useState(columnData);
  const classes = useStyles();

  return (
    <section className={classes.columnsCountTextStyles}>
      <TableContainer component={Box} classes={{ root: classes.customTableContainer }}>
        <Table aria-label="recipe steps table" stickyHeader>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.recipeStepsTableRowStyles}>
              <TableCell className={classes.columnLeft}>
                {`${COLUMNS} (${columns.length})`}
              </TableCell>
              <TableCell className={classes.columnRight}>{NULL_VALUES}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {columns.map((eachColumn, index) => (
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
                    <Box>{PlaceHolderIcon}</Box>
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
