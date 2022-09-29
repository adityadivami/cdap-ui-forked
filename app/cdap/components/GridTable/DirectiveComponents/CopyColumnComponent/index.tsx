/*
 * Copyright © 2022 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
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
