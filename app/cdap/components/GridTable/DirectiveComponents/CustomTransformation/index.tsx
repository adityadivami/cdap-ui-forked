import { FormGroup } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { TYPE_CUSTOM_EXPRESSION, EXAMPLE_CUSTOM_EXP } from '../constants';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';

const CustomTransformation = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [customExp, setCustomExp] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput: customExp });
  }, [customExp]);

  return (
    <FormGroup>
      <div className={classes.formLabelStyles}>{TYPE_CUSTOM_EXPRESSION}</div>
      <FormInputFieldComponent
        formInputValue={customExp}
        classnames={classes.formFieldStyles}
        inputProps={{
          type: 'text',
          value: customExp,
          onChange: (e) => setCustomExp(e.target.value),
          color: 'primary',
          placeholder: EXAMPLE_CUSTOM_EXP,
        }}
      />
    </FormGroup>
  );
};

export default CustomTransformation;
