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

import { IconButton } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from 'components/ColumnInsights/Components/ColumnDetails/styles';
import { IColumnDetailsProps } from 'components/ColumnInsights/Components/ColumnDetails/types';
import RenderLabel from 'components/ColumnInsights/Components/common/RenderLabel';
import InputSelect from 'components/ColumnInsights/Components/InputSelect';
import { PREFIX } from 'components/ColumnInsights/constants';
import { DATATYPE_OPTIONS } from 'components/ColumnInsights/options';
import T from 'i18n-react';
import React, { useState } from 'react';

export default function({
  columnName,
  characterCount,
  distinctValues,
  dataTypeString,
  renameColumnNameHandler,
  dataTypeHandler,
  columnType,
  columnHeaderList,
}: IColumnDetailsProps) {
  const defaultValueProvided =
    DATATYPE_OPTIONS &&
    Array.isArray(DATATYPE_OPTIONS) &&
    DATATYPE_OPTIONS?.length &&
    DATATYPE_OPTIONS.filter((each) => each.value === columnType?.toLowerCase());
  const [dataTypeValue, setDataTypeValue] = useState<string>();
  const classes = useStyles();
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(columnName);
  const [errorMessage, setErrorMessage] = useState({
    hasError: false,
    message: '',
  });

  const displayMessage = {
    invalidMessage: `${PREFIX}.error.invalidError`,
    matchedColumnMessage: `${PREFIX}.error.matchedColumnError`,
  };

  const checkForInvalidInput = (renamedString: string) => {
    if (renamedString === '' || !/^\w+$/.test(renamedString)) {
      setErrorMessage({
        hasError: true,
        message: displayMessage.invalidMessage,
      });
    } else if (columnHeaderList.includes(renamedString) && columnName !== renamedString) {
      setErrorMessage({
        hasError: true,
        message: displayMessage.matchedColumnMessage,
      });
    } else {
      setErrorMessage({
        hasError: false,
        message: '',
      });
    }
  };

  const handleDataTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataTypeValue(e.target.value);
    dataTypeHandler(e.target.value);
  };

  const editHandler = () => {
    setCanEdit(true);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkForInvalidInput(e.target.value);
    setInputValue(e.target.value);
  };

  const onBlurEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    if (errorMessage.hasError) {
      setCanEdit(true);
    } else {
      if (e.target.value !== columnName) {
        setCanEdit(false);
        renameColumnNameHandler(columnName, e.target.value);
      } else {
        setCanEdit(false);
      }
    }
  };

  const onEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (
      (e.target as HTMLInputElement).value !== columnName &&
      !errorMessage.hasError &&
      e.keyCode === 13
    ) {
      renameColumnNameHandler(columnName, (e.target as HTMLInputElement).value);
      setCanEdit(false);
    } else {
      setCanEdit(true);
    }
  };
  return (
    <div className={classes.columnInsightsTopSection} data-testid="column-details-parent">
      <div className={classes.columnNameEdit}>
        {canEdit ? (
          <input
            value={inputValue}
            onBlur={(e) => onBlurEvent(e)}
            onChange={(e) => onChangeHandler(e)}
            onKeyDown={(e) => onEnter(e)}
            data-testid="column-name-edit-input"
            autoFocus
          />
        ) : (
          <RenderLabel fontSize={16} dataTestId={'column-name'}>
            <> {inputValue}</>
          </RenderLabel>
        )}
        <IconButton
          onClick={editHandler}
          className={classes.editIcon}
          aria-label="edit-icon"
          data-testid="edit-icon"
        >
          <EditIcon />
        </IconButton>
      </div>
      {errorMessage.hasError && (
        <div>
          <RenderLabel fontSize={14} color={`${red[600]}`} dataTestId={'invalid-text'}>
            <> {T.translate(errorMessage.message).toString()}</>
          </RenderLabel>
        </div>
      )}

      <InputSelect
        classes={{
          icon: classes.selectIconStyles,
          select: classes.selectStyles,
        }}
        className={classes.selectFieldStyles}
        optionClassName={{ root: classes.optionStyles }}
        defaultValue={defaultValueProvided[0]?.value}
        value={dataTypeValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDataTypeChange(e)}
        options={DATATYPE_OPTIONS}
        fullWidth={false}
        type={'column-insights'}
      />
      <section className={classes.columnInsightsDetailsWrapper}>
        <div className={classes.columnInsightsDetailsCountSection}>
          <RenderLabel fontSize={14}>
            <>
              {T.translate(`${PREFIX}.characterCount`).toString()} {characterCount}
            </>
          </RenderLabel>

          <RenderLabel fontSize={14}>
            <>
              {T.translate(`${PREFIX}.distinct`).toString()} {distinctValues}
            </>
          </RenderLabel>
        </div>

        <RenderLabel fontSize={14}>
          <>{T.translate(`${dataTypeString}`).toString()}</>
        </RenderLabel>
      </section>
    </div>
  );
}
