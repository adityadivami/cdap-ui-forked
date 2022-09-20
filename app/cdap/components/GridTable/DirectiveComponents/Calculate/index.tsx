import React, { useState, useEffect } from 'react';
import { CALCULATE_OPTIONS } from '../../components/NestedMenu/constants';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';
import { FormGroup, FormHelperText, Box } from '@material-ui/core';
import { useStyles } from '../styles';
import InputCheckbox from '../../../ParsingDrawer/Components/InputCheckbox';
import {
  NAME_NEW_COLUMN,
  DESTINATION_COLUMN,
  COLUMN_NAME_EXIST,
  COPY_TO_NEW_COLUMN,
} from '../constants';

const Calculate = (props) => {
  const { functionName, setDirectiveComponentsValue, directiveComponentValues } = props;
  const [customInput, setCustomInput] = useState('');
  const [copyToNewColumn, setCopyToNew] = useState(false);
  const [column, setColumnName] = useState('');
  const [isError, setIsError] = useState(false);
  const UI_INPUT = CALCULATE_OPTIONS.filter((el) => el.value === functionName);
  const classes = useStyles();
  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput });
  }, [customInput]);
  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, copyToNewColumn });
  }, [copyToNewColumn]);
  useEffect(() => {
    if (directiveComponentValues.columnNames.filter((el) => el === column).length) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    setDirectiveComponentsValue({ ...directiveComponentValues, copyColumnName: column });
  }, [column]);
  return (
    <Box className={classes.calculateWrapper}>
      {UI_INPUT.length > 0 &&
        UI_INPUT.map((item) => {
          if (item.value === 'CHARCOUNT') {
            return (
              <Box className={classes.calculateFlex}>
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
              </Box>
            );
          } else {
            if (item.inputRequired) {
              return (
                <Box className={classes.calculateFlex}>
                  {item?.sign && (
                    <div className={`${classes.formLabelStyles} ${classes.signText}`}>
                      {item?.sign}
                    </div>
                  )}
                  <FormGroup>
                    <FormInputFieldComponent
                      formInputValue={customInput}
                      classnames={classes.formFieldStyles}
                      inputProps={{
                        classes: { underline: classes.underlineStyles, input: classes.inputStyles },
                        type: 'number',
                        value: customInput,
                        onChange: (e) => setCustomInput(e.target.value),
                        color: 'primary',
                        placeholder: 'Enter value, e.g. 3',
                      }}
                    />
                  </FormGroup>
                </Box>
              );
            }
          }
        })}
      {functionName !== 'CHARCOUNT' && (
        <FormGroup>
          <InputCheckbox
            label={COPY_TO_NEW_COLUMN}
            value={copyToNewColumn}
            onChange={(e) => setCopyToNew(e.target.checked)}
            className={classes.checkboxStyles}
          />
          {copyToNewColumn && (
            <>
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
            </>
          )}
        </FormGroup>
      )}
    </Box>
  );
};

export default Calculate;
