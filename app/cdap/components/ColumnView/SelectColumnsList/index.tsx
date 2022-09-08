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

const SelectColumnsList = (props) => {
  const { columnData } = props;
  const [columns, setColumns] = useState(columnData);
  const classes = useStyles();

  return (
    <section className={classes.columnsCountTextStyles}>
      <TableContainer component={Box} classes={{ root: classes.customTableContainer }}>
        <Table aria-label="recipe steps table" stickyHeader>
          <TableHead>
            <TableRow className={classes.recipeStepsTableRowStyles}>
              <TableCell className={classes.recipeStepsTableHeadStyles}>
                {`${COLUMNS} (${columns.length})`}
              </TableCell>
              <TableCell className={classes.recipeStepsTableHeadStyles}>{NULL_VALUES}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {columns.map((eachColumn, index) => (
              <TableRow key={index}>
                <TableCell classes={{ body: classes.recipeStepsTableRowStyles }}>
                  <span className={classes.recipeStepsActionTypeStyles}>{eachColumn.label}</span>
                  &nbsp;
                  <br />
                  {eachColumn.type}
                </TableCell>
                <TableCell>{`100%`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default SelectColumnsList;
