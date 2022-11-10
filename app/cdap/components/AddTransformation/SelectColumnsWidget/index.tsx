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
import React from 'react';
import { Typography } from '@material-ui/core';
import T from 'i18n-react';
import { useStyles } from 'components/AddTransformation/SelectColumnsWidget/styles';
import { multipleColumnSelected } from 'components/AddTransformation/constants';
import { ISelectColumnsWidgetProps } from 'components/AddTransformation/SelectColumnsWidget/types';
import ButtonWidget from 'components/AddTransformation/ButtonWidget';
import { ADD_TRANSFORMATION_PREFIX } from 'components/AddTransformation/constants';
import { BlockContainer, FlexBoxContainer } from 'components/common/BoxContainer';
import { SimpleLabel } from 'components/common/TypographyText';
import { TickIcon } from 'components/AddTransformation/iconStore';

export default function({
  selectedColumns,
  transformationName,
  handleSelectColumn,
}: ISelectColumnsWidgetProps) {
  const classes = useStyles();

  const singleColumnSelect = (
    <>
      <FlexBoxContainer justifyContent="space-between" alignItems="center">
        <SimpleLabel
          component="p"
          size="16px"
          weight={600}
          dataTestId="select-column-title"
          text={T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectColumnPara`).toString()}
        />
        {selectedColumns.length > 0 && TickIcon}
      </FlexBoxContainer>
      <BlockContainer padding="10px 0">
        <SimpleLabel
          component="p"
          size="14px"
          weight={400}
          dataTestId="select-column-subtitle"
          text={T.translate(`${ADD_TRANSFORMATION_PREFIX}.quickSelect`).toString()}
        />
      </BlockContainer>
      {Array.isArray(selectedColumns) && selectedColumns.length ? (
        selectedColumns.map((item, index) => (
          <BlockContainer padding="5px 0">
            <SimpleLabel
              component="p"
              size="14px"
              weight={400}
              dataTestId="selected-function-name"
              text={`${index + 1}. ${item.label}`}
            />
          </BlockContainer>
        ))
      ) : (
        <ButtonWidget
          buttonText={
            multipleColumnSelected?.filter((el) => el.value === transformationName).length > 0
              ? T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectMultiColumns`).toString()
              : T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectColumn`).toString()
          }
          className={classes.selectButtonStyles}
          onClick={() => handleSelectColumn(false)}
          variant="outlined"
          disabled={false}
          buttonId="select-column-button"
        />
      )}
    </>
  );

  return <section className={classes.functionSectionStyles}>{singleColumnSelect}</section>;
}
