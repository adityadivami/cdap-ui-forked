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
import { Typography, Box } from '@material-ui/core';
import { useStyles } from 'components/GridTable/components/FunctionNameToggle/styles';
import T from 'i18n-react';
import SwitchInputComponent from 'components/common/Switch';
import { SimpleLabel } from 'components/common/TypographyText';

const PREFIX = 'features.WranglerNewUI.GridPage';

interface IFunctionNameToggleProps {
  setShowName: React.Dispatch<React.SetStateAction<boolean>>;
  showName: boolean;
}

export default function({ setShowName, showName }: IFunctionNameToggleProps) {
  const classes = useStyles();
  return (
    <Box
      className={classes.functionWrapper}
      data-testid="transformations-toolbar-icons-function-name-toggler"
    >
      <SimpleLabel
        text={T.translate(`${PREFIX}.toolbarIcons.labels.toggleDescription`).toString()}
        component="div"
        dataTestId="name-toggle-child-label"
      />
      <SwitchInputComponent
        setShow={setShowName}
        show={showName}
        inputProps={{
          'aria-label': T.translate(`${PREFIX}.gridHeader.ariaLabels.functionsName`).toString(),
          'data-testid': 'transformations-toolbar-icons-function-name-toggler',
        }}
      />
    </Box>
  );
}
