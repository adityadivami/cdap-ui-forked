import React, { useState } from 'react';
import { SELECT_ACTION_TO_TAKE, NAME_OF_COLUMN, REPLACE_WITH, OLD_VALUE } from '../../../constants';
import { useStyles } from '../../../styles';
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  TextField,
  FormLabel,
  Typography,
  Checkbox,
} from '@material-ui/core';

const FindAnReplace = (props) => {
  const {
    setReplaceValue,
    replaceValue,
    oldValue,
    setOldValue,
    exactMatch,
    setExactMatch,
    ignoreCase,
    setIgnoreCase,
  } = props;
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
        <FormLabel className={classes.replaceWithText}>{OLD_VALUE}</FormLabel>
        <TextField
          variant="outlined"
          value={oldValue}
          onChange={(e) => setOldValue(e.target.value)}
        />
      </FormControl>
      <FormControlLabel
        label="Exact Match"
        control={
          <Checkbox
            color="primary"
            checked={exactMatch}
            onChange={(e) => setExactMatch(e.target.checked)}
          />
        }
      />
      <FormControlLabel
        label="Ignore Case"
        control={
          <Checkbox
            color="primary"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
          />
        }
      />
      <FormControl className={classes.replaceWithInput}>
        <FormLabel className={classes.replaceWithText}>{REPLACE_WITH}</FormLabel>
        <TextField
          variant="outlined"
          value={replaceValue}
          onChange={(e) => setReplaceValue(e.target.value)}
        />
      </FormControl>
    </section>
  );
};

export default FindAnReplace;
