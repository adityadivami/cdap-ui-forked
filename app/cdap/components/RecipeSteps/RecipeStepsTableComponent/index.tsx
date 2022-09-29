import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { RECIPE_STEPS, SERIAL_NUMBER } from '../constants';
import { useStyles } from '../styles';

const RecipeStepsTableComponent = (props) => {
  const { recipeSteps, handleDeleteRecipeSteps } = props;
  const classes = useStyles();

  const handleDelete = (eachStep, i) => {
    handleDeleteRecipeSteps(recipeSteps.filter((x, index) => index < i));
  };

  return (
    <TableContainer component={Box}>
      <Table aria-label="recipe steps table">
        <TableHead>
          <TableRow className={classes.recipeStepsTableRowStyles}>
            <TableCell classes={{ head: classes.recipeStepsTableHeadStyles }}>
              {SERIAL_NUMBER}
            </TableCell>
            <TableCell classes={{ head: classes.recipeStepsTableHeadStyles }}>
              {RECIPE_STEPS}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {recipeSteps.map((eachStep, index) => (
            <TableRow className={classes.recipeStepsTableBodyRowStyles} key={index}>
              <TableCell classes={{ body: classes.recipeStepsTableRowStyles }}>
                {index + 1 > 10 ? index + 1 : `0${index + 1}`}
              </TableCell>
              <TableCell classes={{ body: classes.recipeStepsTableRowStyles }}>
                <span>{eachStep}</span>
                {/* <span className={classes.recipeStepsActionTypeStyles}>{eachStep.actionType}</span>
                &nbsp;
                {eachStep.description} */}
              </TableCell>
              <TableCell
                className={[classes.recipeStepsTableRowStyles, classes.displayNone].join(' ')}
              >
                <img
                  className={classes.recipeStepsDeleteStyles}
                  onClick={() => handleDelete(eachStep, index)}
                  src="/cdap_assets/img/delete.svg"
                  alt="delete"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecipeStepsTableComponent;
