import { Button, Typography } from '@material-ui/core';
import React from 'react';
import {
  QUICK_SELECT_INFO,
  SELECT_COLUMNS,
  SELECT_COLUMNS_TO_APPLY_THIS_FUNCTION,
  SELECT_COLUMNS_1_TO_APPLY_THIS_FUNCTION,
  SELECT_COLUMNS_2_TO_APPLY_THIS_FUNCTION,
  SELECT_MULTI_COLUMNS,
} from '../constants';
import { useStyles } from '../styles';
import { multipleColumnSelected } from '../constants';

const SelectColumnsWidget = (props) => {
  const { selectedColumns, functionName, selected_column_2 } = props;
  const classes = useStyles();

  const singleColumnSelect = () => {
    return (
      <>
        <div className={classes.functionHeadingTextStyles}>
          {SELECT_COLUMNS_TO_APPLY_THIS_FUNCTION}
        </div>
        <div className={classes.quickSelectTextStyles}>{QUICK_SELECT_INFO}</div>
        {selectedColumns.length ? (
          selectedColumns.map((item, index) => {
            return (
              <Typography variant="body1" className={classes.quickSelectTextStyles}>
                {index + 1}.&nbsp; {item.label}
              </Typography>
            );
          })
        ) : (
          <Button
            variant="outlined"
            color="primary"
            className={classes.selectButtonStyles}
            onClick={() => props.handleSelectColumn(false)}
          >
            {multipleColumnSelected.filter((el) => el.value === functionName).length > 0
              ? SELECT_MULTI_COLUMNS
              : SELECT_COLUMNS}
          </Button>
        )}
      </>
    );
  };

  const multiColumnSelect = () => {
    return (
      <>
        <div className={classes.functionHeadingTextStyles}>
          {SELECT_COLUMNS_1_TO_APPLY_THIS_FUNCTION}
        </div>
        <div className={classes.quickSelectTextStyles}>{QUICK_SELECT_INFO}</div>
        {selectedColumns.length ? (
          selectedColumns.map((item, index) => {
            return (
              <Typography variant="body1" className={classes.quickSelectTextStyles}>
                {index + 1}.&nbsp; {item.label}
              </Typography>
            );
          })
        ) : (
          <Button
            variant="outlined"
            color="primary"
            className={classes.selectButtonStyles}
            onClick={() => props.handleSelectColumn(false)}
          >
            {SELECT_COLUMNS}
          </Button>
        )}
        <div className={classes.functionHeadingTextStyles}>
          {SELECT_COLUMNS_2_TO_APPLY_THIS_FUNCTION}
        </div>
        <div className={classes.quickSelectTextStyles}>{QUICK_SELECT_INFO}</div>
        {selected_column_2.length ? (
          selected_column_2.map((item, index) => {
            return (
              <Typography variant="body1" className={classes.quickSelectTextStyles}>
                {index + 1}.&nbsp; {item.label}
              </Typography>
            );
          })
        ) : (
          <Button
            variant="outlined"
            color="primary"
            className={classes.selectButtonStyles}
            onClick={() => props.handleSelectColumn(true)}
            disabled={selectedColumns.length === 0 ? true : false}
          >
            {SELECT_COLUMNS}
          </Button>
        )}
      </>
    );
  };

  return <section className={classes.functionSectionStyles}>{singleColumnSelect()}</section>;
};

export default SelectColumnsWidget;
