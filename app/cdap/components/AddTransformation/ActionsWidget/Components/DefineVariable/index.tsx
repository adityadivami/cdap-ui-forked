import React from 'react';
import { SELECT_ACTION_TO_TAKE, REMOVE_ROWS, KEEP_ROWS, REPLACE_WITH } from '../../../constants';
import { useStyles } from '../../../styles';
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  TextField,
  FormLabel,
  Select,
  MenuItem,
  Checkbox,
} from '@material-ui/core';
import { OPTIONS_MAP } from './constants';

const FilterAction = (props) => {
  const {
    selectedAction,
    setSelectedAction,
    textValue,
    setTextValue,
    variableName,
    setVariableName,
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
      <br />
      <FormControl className={classes.replaceWithInput}>
        <FormLabel className={classes.replaceWithText}>{'Enter Variable Name'}</FormLabel>
        <TextField
          variant="outlined"
          value={variableName}
          onChange={(e) => setVariableName(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.replaceWithInput}>
        <Select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          variant="outlined"
        >
          {OPTIONS_MAP.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.replaceWithInput}>
        <FormLabel className={classes.replaceWithText}>{'Enter Value'}</FormLabel>
        <TextField
          variant="outlined"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </FormControl>
    </section>
  );
};

export default FilterAction;
