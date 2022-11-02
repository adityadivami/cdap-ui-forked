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

import { DATATYPE_OPTIONS } from 'components/ColumnInsights/options';
import React, { useState } from 'react';
import { useStyles } from './styles';
import EditIcon from '@material-ui/icons/Edit';
import { Box } from '@material-ui/core';
import InputSelect from '../InputSelect';

export default function ColumnDetails({
  columnName,
  characterCount,
  distinctValues,
  dataTypeString,
  renameColumnNameHandler,
  dataTypeHandler,
  columnType,
}) {
  const defaultValueProvided = DATATYPE_OPTIONS.filter(
    (each) => each.value === columnType.toLowerCase()
  );
  const [dataTypeValue, setDataTypeValue] = useState();
  const classes = useStyles();
  const [canEdit, setCanEdit] = useState(false);
  const [inputValue, setInputValue] = useState(columnName);

  const handleDataTypeChange = (e) => {
    setDataTypeValue(e.target);
    dataTypeHandler(e.target.value);
  };

  const editHandler = () => {
    setCanEdit(true);
  };

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onBlurEvent = (e) => {
    setInputValue(e.target.value);
    setCanEdit(false);
    if (e.target.value !== columnName) {
      renameColumnNameHandler(columnName, e.target.value);
    }
  };

  return (
    <section className={classes.columnInsightsTopSection}>
      <div className={classes.columnInsightsColumnName}>
        {canEdit ? (
          <input
            value={inputValue}
            onBlur={(e) => onBlurEvent(e)}
            onChange={(e) => onChangeHandler(e)}
          />
        ) : (
          inputValue
        )}
        <Box>
          <EditIcon onClick={editHandler} />
        </Box>
      </div>

      <InputSelect
        classes={{
          icon: classes.selectIconStyles,
          select: classes.selectStyles,
        }}
        className={classes.selectFieldStyles}
        optionClassName={{ root: classes.optionStyles }}
        defaultValue={defaultValueProvided[0].value}
        value={dataTypeValue}
        onChange={(e) => handleDataTypeChange(e)}
        options={DATATYPE_OPTIONS}
        fullWidth={false}
      />
      <section className={classes.columnInsightsDetailsWrapper}>
        <div className={classes.columnInsightsDetailsCountSection}>
          <div className={classes.columnInsightsDetailsCount}>Character count {characterCount}</div>
          <div className={classes.dividerLineStyles} />
          <div className={classes.columnInsightsDetailsCount}>Distinct {distinctValues}</div>
        </div>
        <div className={classes.columnInsightsDetailsCountDescription}>{dataTypeString}</div>
      </section>
    </section>
  );
}
