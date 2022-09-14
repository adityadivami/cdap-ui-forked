import React from 'react';
import { SELECT_ACTION_TO_TAKE, TYPE_TRANSFORMATION } from '../../../constants';
import { useStyles } from '../../../styles';
import { FormControl, TextField, FormLabel, Typography } from '@material-ui/core';

const CustomTransform = (props) => {
  const { selectedColumns, setReplaceValue, replaceValue } = props;
  const classes = useStyles();

  return (
    <section className={classes.functionSectionStyles}>
      <div className={classes.funtionSectionWrapperStyles}>
        <div className={classes.functionHeadingTextStyles}>{SELECT_ACTION_TO_TAKE}</div>
        <img
          className={classes.greenCheckIconStyles}
          src="/cdap_assets/img/green-check.svg"
          alt="tick icon"
        />
      </div>
      <FormControl className={classes.replaceWithInput}>
        <FormLabel className={classes.replaceWithText}>
          {TYPE_TRANSFORMATION + ' ' + selectedColumns[0].label}
        </FormLabel>
        <TextField
          variant="outlined"
          value={replaceValue}
          onChange={(e) => setReplaceValue(e.target.value)}
        />
      </FormControl>
    </section>
  );
};

export default CustomTransform;
