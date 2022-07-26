import Box from '@material-ui/core/Box';
import React from 'react';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    marginTop: '23px',
    marginLeft: '23px',
  },
  root: {
    width: '1204px',
    height: '77px',
    border: '1px solid #DADCE0',
  },

  tabelCellStyles: {
    fontSize: '16px',
  },
});
const OngoingDataExploration = () => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.container}>
      <Table className={classes.root}>
        <TableBody>
          <TableRow>
            <TableCell>Icon</TableCell>
            <TableCell>
              <Typography className={classes.tabelCellStyles}>IndiaSales_DataTable2</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.tabelCellStyles}>Connection_Sales_Big</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.tabelCellStyles}>14 Recipe steps</Typography>
            </TableCell>
            <TableCell>
              <Typography>65%</Typography>
              <Typography className={classes.tabelCellStyles}> Data Quality</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default OngoingDataExploration;
