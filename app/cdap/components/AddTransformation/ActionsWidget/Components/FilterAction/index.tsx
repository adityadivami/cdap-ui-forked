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
import { OPTIONS_MAP, DIRECTIVES_MAP } from './constants';

const FilterAction = (props) => {
  const {
    selectedAction,
    setSelectedAction,
    setReplaceValue,
    replaceValue,
    ignoreCase,
    setIgnoreCase,
    textValue,
    setTextValue,
    filterAction,
    setFilterAction,
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
      <FormControl>
        <RadioGroup
          name="actions"
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
        >
          <FormControlLabel
            value="KEEP"
            className={classes.radioStyles}
            control={<Radio color="primary" />}
            label={KEEP_ROWS}
          />
          <FormControlLabel
            value="REMOVE"
            className={classes.radioStyles}
            control={<Radio color="primary" />}
            label={REMOVE_ROWS}
          />
        </RadioGroup>
      </FormControl>
      <br />
      <FormControl className={classes.replaceWithInput}>
        <Select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          variant="outlined"
        >
          {OPTIONS_MAP.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
        <FormControlLabel
          label="Ignore case"
          control={
            <Checkbox
              color="primary"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
            />
          }
        />
      </FormControl>
      {replaceValue != 'EMPTY' && (
        <FormControl className={classes.replaceWithInput}>
          <FormLabel className={classes.replaceWithText}>{'Enter Value'}</FormLabel>
          <TextField
            variant="outlined"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </FormControl>
      )}
    </section>
  );
};

export default FilterAction;
