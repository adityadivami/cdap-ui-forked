import { Button, Typography } from '@material-ui/core';
import React from 'react';
import {
  QUICK_SELECT_INFO,
  SELECT_COLUMNS,
  SELECT_COLUMNS_TO_APPLY_THIS_FUNCTION,
} from '../constants';
import { useStyles } from '../styles';

const SelectColumnsWidget = (props) => {
  const { selectedColumns } = props;
  const classes = useStyles();

  return (
    <section className={classes.functionSectionStyles}>
      <div className={classes.functionHeadingTextStyles}>
        <div className={classes.selectedColumnTickIcon}>
          {SELECT_COLUMNS_TO_APPLY_THIS_FUNCTION}
          {selectedColumns.length !== 0 && (
            <img
              className={classes.greenCheckIconStyles}
              src="/cdap_assets/img/green-check.svg"
              alt="tick icon"
            />
          )}
        </div>
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
          onClick={props.handleSelectColumn}
        >
          {SELECT_COLUMNS}
        </Button>
      )}
    </section>
  );
};

export default SelectColumnsWidget;
