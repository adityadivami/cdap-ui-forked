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
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import T from 'i18n-react';
import { useStyles } from 'components/AddTransformation/FunctionNameWidget/styles';
import { TickIcon } from 'components/AddTransformation/iconStore';
import { IFunctionNameWidgetProps } from 'components/AddTransformation/FunctionNameWidget/types';
import { ADD_TRANSFORMATION_PREFIX } from 'components/AddTransformation/constants';
import BoxContainer from 'components/common/BoxContainer';
import TypographyText from 'components/common/TypographyText';

export default function({ transformationName }: IFunctionNameWidgetProps) {
  const classes = useStyles();

  return (
    <section className={classes.functionSectionStyles}>
      <BoxContainer type="FlexBox" justifyContent="space-between">
        <TypographyText
          component="span"
          size="16px"
          weight={600}
          type="simple"
          dataTestId="function-name-head"
          text={T.translate(`${ADD_TRANSFORMATION_PREFIX}.function`).toString()}
        />
        {TickIcon}
      </BoxContainer>
      <BoxContainer type="SimpleBox" justifyContent="space-between" padding="10px 0 0 0">
        <TypographyText
          component="span"
          size="16px"
          weight={400}
          type="simple"
          dataTestId="selected-function-name"
          text={transformationName}
        />
        <span data-testid="selected-function-info" id="selected-function-info">
          <InfoOutlinedIcon className={classes.infoIcon} />
        </span>
      </BoxContainer>
    </section>
  );
}
