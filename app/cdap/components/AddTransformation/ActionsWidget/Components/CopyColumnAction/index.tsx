import React from 'react';
import { SELECT_ACTION_TO_TAKE, NAME_OF_COLUMN, NAME_ALREADY_TAKEN } from '../../../constants';
import { useStyles } from '../../../styles';
import { FormControl, TextField, FormLabel, Typography } from '@material-ui/core';

const CopyColumnWidget = (props) => {
  const { selectedAction, setSelectedAction, setReplaceValue, replaceValue, columnData } = props;
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
        <FormLabel className={classes.replaceWithText}>{NAME_OF_COLUMN}</FormLabel>
        <TextField
          variant="outlined"
          value={replaceValue}
          onChange={(e) => setReplaceValue(e.target.value)}
        />
      </FormControl>
      {columnData.findIndex((el) => el == replaceValue) > -1 && (
        <Typography variant="body1" className={classes.warningText}>
          {NAME_ALREADY_TAKEN}
        </Typography>
      )}
    </section>
  );
};

export default CopyColumnWidget;
