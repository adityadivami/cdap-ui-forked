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

import { Avatar } from '@material-ui/core';
import ImageOutlined from '@material-ui/icons/ImageOutlined';
import React from 'react';
import styled from 'styled-components';
import { IWidgetSrc } from '../../../../../../Documents/cdap-ui-forked/app/cdap/components/WrangleHome/Components/WrangleCard/types';

export default function({ dataSrc }: IWidgetSrc) {
  return dataSrc ? (
    <Avatar
      src={dataSrc as string}
      variant="square"
      data-testid="card-image-from-widget-api"
      id="card-image-from-widget-api"
    />
  ) : (
    <ImageOutlined
      style={{ fontSize: 40 }}
      data-testid="card-image-default"
      id="card-image-default"
    />
  );
}
