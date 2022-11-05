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
import { useStyles } from 'components/AddTransformation/styles';
import { multipleColumnSelected } from 'components/AddTransformation/constants';
import { ISelectColumnsWidgetProps } from 'components/AddTransformation/SelectColumnsWidget/types';
import ButtonWidget from 'components/AddTransformation/ButtonWidget';
import { ADD_TRANSFORMATION_PREFIX } from 'components/AddTransformation/constants';

export default function({
  selectedColumns,
  functionName,
  handleSelectColumn,
}: ISelectColumnsWidgetProps) {
  const classes = useStyles();

  const singleColumnSelect = (
    <>
      <div
        className={classes.functionHeadingTextStyles}
        id="select-column-title"
        data-testid="select-column-title"
      >
        {T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectColumnPara`)}
      </div>
      <div
        className={classes.quickSelectTextStyles}
        id="select-column-subtitle"
        data-testid="select-column-subtitle"
      >
        {T.translate(`${ADD_TRANSFORMATION_PREFIX}.quickSelect`)}
      </div>
      {Array.isArray(selectedColumns) && selectedColumns.length ? (
        selectedColumns.map((item, index) => (
          <Typography component="p" variant="body1" className={classes.quickSelectTextStyles}>
            {index + 1}.&nbsp; {item.label}
          </Typography>
        ))
      ) : (
        <ButtonWidget
          buttonText={
            multipleColumnSelected?.filter((el) => el.value === functionName).length > 0
              ? T.translate(
                  `${ADD_TRANSFORMATION_PREFIX}.selectMultiColumns`
                ).toString()
              : T.translate(
                  `${ADD_TRANSFORMATION_PREFIX}.selectColumn`
                ).toString()
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
