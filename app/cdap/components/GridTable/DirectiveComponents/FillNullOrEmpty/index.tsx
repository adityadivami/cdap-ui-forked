import { FormGroup } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { FILL_NULL_EMPTY } from '../constants';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';

const FindAndReplace = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [replaceValue, setReplaceValue] = useState('');

  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput: replaceValue });
  }, [replaceValue]);

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{FILL_NULL_EMPTY}</div>
        <FormInputFieldComponent
          formInputValue={replaceValue}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'text',
            value: replaceValue,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            onChange: (e) => setReplaceValue(e.target.value),
            color: 'primary',
            placeholder: 'Enter value',
          }}
        />
      </FormGroup>
    </div>
  );
};

export default FindAndReplace;
