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
import T from 'i18n-react';
import { multipleColumnSelected } from 'components/AddTransformation/constants';
import { ISelectColumnsWidgetProps } from 'components/AddTransformation/SelectColumnsWidget/types';
import { ADD_TRANSFORMATION_PREFIX } from 'components/AddTransformation/constants';
import {
  TransformationNameTextInfoWrapper,
  TransformationNameHeadWrapper,
  TransformationNameBox,
} from 'components/common/BoxContainer';
import { SubHeadBoldFont, NormalFont } from 'components/common/TypographyText';
import { TickIcon } from 'components/AddTransformation/iconStore';
import { SelectColumnButton } from 'components/common/ButtonWidget';

export default function({
  selectedColumns,
  transformationName,
  handleSelectColumn,
}: ISelectColumnsWidgetProps) {
  const singleColumnSelect = (
    <>
      <TransformationNameHeadWrapper>
        <SubHeadBoldFont component="p" data-testid="select-column-title">
          {T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectColumnPara`)}
        </SubHeadBoldFont>
        {selectedColumns.length > 0 && TickIcon}
      </TransformationNameHeadWrapper>
      <TransformationNameTextInfoWrapper padding="10px 0">
        <NormalFont component="p" data-testid="select-column-subtitle">
          {T.translate(`${ADD_TRANSFORMATION_PREFIX}.quickSelect`)}
        </NormalFont>
      </TransformationNameTextInfoWrapper>
      {Array.isArray(selectedColumns) && selectedColumns.length ? (
        selectedColumns.map((item, index) => (
          <TransformationNameTextInfoWrapper padding="5px 0">
            <NormalFont component="p" data-testid="selected-function-name">{`${index + 1}. ${
              item.label
            }`}</NormalFont>
          </TransformationNameTextInfoWrapper>
        ))
      ) : (
        <SelectColumnButton
          onClick={() => handleSelectColumn(false)}
          disabled={false}
          data-testid="select-column-button"
        >
          {multipleColumnSelected?.filter((el) => el.value === transformationName).length > 0
            ? T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectMultiColumns`).toString()
            : T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectColumn`).toString()}
        </SelectColumnButton>
      )}
    </>
  );

  return <TransformationNameBox>{singleColumnSelect}</TransformationNameBox>;
}
