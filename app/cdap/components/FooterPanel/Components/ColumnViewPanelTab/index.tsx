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

import { Box } from '@material-ui/core';
import CustomTooltip from 'components/ConnectionList/Components/CustomTooltip';
import { useStyles } from 'components/FooterPanel/Components/ColumnViewPanelTab/styles';
import { ColumnIcon } from 'components/FooterPanel/IconStore/ColumnIcon';
import T from 'i18n-react';
import React from 'react';

const PREFIX = 'features.FooterPanel.labels';

export default function({ columnViewPanelOpened, setOpenColumnViewHandler }) {
  const classes = useStyles();

  return (
    <Box>
      <CustomTooltip title={`${T.translate(`${PREFIX}.columnViewPanel`)}`}>
        <Box
          className={`${classes.imgContainer} ${
            columnViewPanelOpened ? classes.showDepth : classes.showNormalView
          }`}
          data-testid="footer-panel-column-icon-container"
          id="footer-panel-column-icon-container"
          onClick={setOpenColumnViewHandler}
        >
          {ColumnIcon}
        </Box>
      </CustomTooltip>
    </Box>
  );
}
