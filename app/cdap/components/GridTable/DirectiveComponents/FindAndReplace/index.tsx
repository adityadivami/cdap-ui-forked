import { FormGroup } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { FIND, OLD_VALUE, IGNORE_CASE, EXACT_MATCH, REPLACE_WITH, NEW_VALUE } from '../constants';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';
import InputCheckbox from '../../../ParsingDrawer/Components/InputCheckbox';

const FindAndReplace = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [oldValue, setOldValue] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [exactMatch, setExactMatch] = useState(false);
  const [newValue, setNewValue] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, findPreviousValue: oldValue });
  }, [oldValue]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, ignoreCase });
  }, [ignoreCase]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, exactMatch });
  }, [exactMatch]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, findReplaceValue: newValue });
  }, [newValue]);

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{FIND}</div>
        <FormInputFieldComponent
          formInputValue={oldValue}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'text',
            value: oldValue,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            onChange: (e) => setOldValue(e.target.value),
            color: 'primary',
            placeholder: OLD_VALUE,
          }}
        />
        <InputCheckbox
          label={IGNORE_CASE}
          value={ignoreCase}
          onChange={(e) => setIgnoreCase(e.target.checked)}
          className={classes.checkboxStyles}
        />
        <InputCheckbox
          label={EXACT_MATCH}
          value={exactMatch}
          onChange={(e) => setExactMatch(e.target.checked)}
          className={classes.checkboxStyles}
        />
      </FormGroup>
      <FormGroup>
        <div className={classes.formLabelStyles}>{REPLACE_WITH}</div>
        <FormInputFieldComponent
          formInputValue={newValue}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'text',
            value: newValue,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            onChange: (e) => setNewValue(e.target.value),
            color: 'primary',
            placeholder: NEW_VALUE,
          }}
        />
      </FormGroup>
    </div>
  );
};

export default FindAndReplace;
