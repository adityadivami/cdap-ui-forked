/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import T from 'i18n-react';
import ActionsPopover, { IAction } from 'components/shared/ActionsPopover';

const ActionsWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const PREFIX = 'features.WranglerNewUI.Recipe';

export default function HeaderActionTemplate() {
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const actions: IAction[] = [
    {
      label: T.translate(`${PREFIX}.edit`),
    },
    {
      label: T.translate(`${PREFIX}.download`),
    },
    {
      label: T.translate(`${PREFIX}.delete`),
    },
  ];

  return (
    <ActionsWrapper>
      <ActionsPopover actions={actions} showPopover={showPopover} togglePopover={togglePopover} />
    </ActionsWrapper>
  );
}
