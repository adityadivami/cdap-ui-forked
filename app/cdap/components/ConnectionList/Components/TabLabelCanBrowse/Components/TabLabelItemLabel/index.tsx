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

import { Typography } from '@material-ui/core';
import { ITabLabelItemProps } from 'components/ConnectionList/Components/TabLabelCanBrowse/types';
import React, { Fragment } from 'react';
import styled from 'styled-components';

const RenderTabLabel = styled(Typography)`
  &&& {
    max-width: 153px;
    white-space: nowrap;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
  }
`;

const RenderCount = styled(Typography)`
  &&& {
    font-size: 16px;
    overflow: hidden;
  }
`;

export default function({ labelTestId, label, count, myLabelRef }: ITabLabelItemProps) {
  return (
    <Fragment>
      <RenderTabLabel variant="body1" ref={myLabelRef} data-testid={labelTestId} component="span">
        {label}
      </RenderTabLabel>
      {count && (
        <RenderCount variant="body1" component="span">
          {`(${count})`}
        </RenderCount>
      )}
    </Fragment>
  );
}
