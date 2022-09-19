import { FormGroup, FormHelperText } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { NAME_NEW_COLUMN, DESTINATION_COLUMN, COLUMN_NAME_EXIST } from '../constants';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';

const CopyColumn = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [column, setColumnName] = useState('');
  const [isError, setIsError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (directiveComponentValues.columnNames.filter((el) => el === column).length) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    setDirectiveComponentsValue({ ...directiveComponentValues, copyColumnName: column });
  }, [column]);

  return (
    <FormGroup>
      <div className={classes.formLabelStyles}>{NAME_NEW_COLUMN}</div>
      <FormInputFieldComponent
        formInputValue={column}
        classnames={classes.formFieldStyles}
        inputProps={{
          classes: { underline: classes.underlineStyles, input: classes.inputStyles },
          type: 'text',
          value: column,
          onChange: (e) => setColumnName(e.target.value),
          color: 'primary',
          placeholder: DESTINATION_COLUMN,
        }}
      />
      {isError && <FormHelperText error={isError}>{COLUMN_NAME_EXIST}</FormHelperText>}
    </FormGroup>
  );
};

export default CopyColumn;
