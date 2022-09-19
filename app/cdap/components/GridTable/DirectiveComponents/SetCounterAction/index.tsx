import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  MenuItem,
} from '@material-ui/core';
import InputCheckbox from '../../../ParsingDrawer/Components/InputCheckbox';
import React, { useState, useEffect } from 'react';
import { SELECT_ACTION, INCREMENT_COUNT_BY, NAME_THIS_COUNTER } from '../constants';
import { SET_COUNTER_OPTION } from '../options';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';
import SelectOptionComponent from '../HashComponent/SelectComponent';

const FilterComponent = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [filterCondition, setFilterCondition] = useState('true');
  const [filterValue, setFilterValue] = useState('');
  const [counter, setCounter] = useState(1);
  const [counterName, setCounterName] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      filterCondition: SET_COUNTER_OPTION[0].value,
      counter,
    });
  }, []);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, filterCondition });
  }, [filterCondition]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, filterConditionValue: filterValue });
  }, [filterValue]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, counter });
  }, [counter]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, counterName });
  }, [counterName]);

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{SELECT_ACTION}</div>
        <FormControl>
          <SelectOptionComponent
            formInputValue={filterCondition}
            inputProps={{
              value: filterCondition,
              onChange: (e) => setFilterCondition(e.target.value),
              color: 'primary',
              placeholder: '',
            }}
            label=""
          >
            {SET_COUNTER_OPTION.map((filter) => (
              <MenuItem value={filter.value}>{filter.label}</MenuItem>
            ))}
          </SelectOptionComponent>
        </FormControl>
      </FormGroup>
      {filterCondition != 'true' && (
        <FormGroup>
          <FormInputFieldComponent
            formInputValue={filterValue}
            classnames={classes.formFieldStyles}
            inputProps={{
              type: 'text',
              value: filterValue,
              classes: { underline: classes.underlineStyles, input: classes.inputStyles },
              onChange: (e) => setFilterValue(e.target.value),
              color: 'primary',
              placeholder: 'Enter JEXL condition',
            }}
          />
        </FormGroup>
      )}
      <FormGroup>
        <div className={classes.formLabelStyles}>{INCREMENT_COUNT_BY}</div>
        <FormInputFieldComponent
          formInputValue={counter}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'number',
            value: counter,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            onChange: (e) => setCounter(e.target.value),
            color: 'primary',
          }}
        />
      </FormGroup>
      <FormGroup>
        <div className={classes.formLabelStyles}>{NAME_THIS_COUNTER}</div>
        <FormInputFieldComponent
          formInputValue={counterName}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'text',
            value: counterName,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            onChange: (e) => setCounterName(e.target.value),
            color: 'primary',
            placeholder: 'Enter counter name',
          }}
        />
      </FormGroup>
    </div>
  );
};

export default FilterComponent;
