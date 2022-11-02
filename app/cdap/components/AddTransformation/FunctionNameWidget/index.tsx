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
import { useStyles } from 'components/AddTransformation/styles';
import { TickIcon } from 'components/AddTransformation/iconStore';
import { IFunctionNameWidgetProps } from 'components/AddTransformation/FunctionNameWidget/types';

export default function({ functionName }: IFunctionNameWidgetProps) {
  const classes = useStyles();

  return (
    <section className={classes.functionSectionStyles}>
      <div className={classes.funtionSectionWrapperStyles}>
        <div
          className={classes.functionHeadingTextStyles}
          data-testid="function-name-head"
          id="function-name-head"
        >
          {T.translate('features.WranglerNewUI.GridPage.addTransformationPanel.function')}
        </div>
        {TickIcon}
      </div>
      <div className={classes.functionInfoSectionStyles}>
        <span
          data-testid="selected-function-name"
          id="selected-function-name"
          className={classes.functionTextStyles}
        >
          {functionName}
        </span>
        <span data-testid="selected-function-info" id="selected-function-info">
          <InfoOutlinedIcon className={classes.infoIcon} />
        </span>
      </div>
    </section>
  );
}
