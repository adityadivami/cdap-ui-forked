import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import InputCheckbox from '../../../ParsingDrawer/Components/InputCheckbox';
import React, { useState, useEffect } from 'react';
import { ADD, ENTER_STRING, COPY_TO_NEW_COLUMN, DESTINATION_COLUMN } from '../constants';
import { CONCATENATE_OPTIONS } from '../options';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';

const Concatenate = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [placement, setPlacement] = useState('');
  const [stringValue, setStringValue] = useState('');
  const [copy, setCopy] = useState(false);
  const [columnName, setColumnName] = useState('');
  const classes = useStyles();
  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, radioOption: placement });
  }, [placement]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput: stringValue });
  }, [stringValue]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, copyToNewColumn: copy });
  }, [copy]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, copyColumnName: columnName });
  }, [columnName]);

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{ADD}</div>
        <FormControl>
          <FormControlLabel
            value={stringValue}
            className={classes.formFieldStyles}
            control={
              <Input
                classes={{
                  underline: classes.underlineStyles,
                  input: classes.inputStyles,
                }}
                type={'text'}
                value={stringValue}
                onChange={(e) => setStringValue(e.target.value)}
                color="primary"
                placeholder={ENTER_STRING}
              />
            }
            label={''}
          />
          <RadioGroup
            name="actions"
            value={placement}
            onChange={(e) => setPlacement(e.target.value)}
          >
            {CONCATENATE_OPTIONS.map((eachRadio) => (
              <FormControlLabel
                value={eachRadio.value}
                className={classes.radioStyles}
                control={<Radio color="primary" />}
                label={eachRadio.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <InputCheckbox
          label={COPY_TO_NEW_COLUMN}
          value={copy}
          onChange={(e) => setCopy(e.target.checked)}
          className={classes.checkboxStyles}
        />
      </FormGroup>
      {copy && (
        <FormGroup>
          <FormInputFieldComponent
            formInputValue={columnName}
            classnames={classes.formFieldStyles}
            inputProps={{
              type: 'text',
              value: columnName,
              classes: { underline: classes.underlineStyles, input: classes.inputStyles },
              onChange: (e) => setColumnName(e.target.value),
              color: 'primary',
              placeholder: DESTINATION_COLUMN,
            }}
          />
        </FormGroup>
      )}
    </div>
  );
};

export default Concatenate;
