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

import { IRenderLabelProps } from 'components/ConnectionList/Components/ConnectionTabs/types';
import TabLabelCanBrowse from 'components/ConnectionList/Components/TabLabelCanBrowse';
import TabLabelCanSample from 'components/ConnectionList/Components/TabLabelCanSample';
import React from 'react';

export default function({
  index,
  connectorType,
  connectionIdProp,
  toggleLoader,
  setIsErrorOnNoWorkSpace,
}: IRenderLabelProps) {
  return [0, 1].includes(index) || connectorType.canBrowse ? (
    <TabLabelCanBrowse
      label={connectorType.name}
      count={index === 0 ? connectorType.count : undefined}
      index={index}
      icon={connectorType.icon}
    />
  ) : (
    <TabLabelCanSample
      label={connectorType.name}
      entity={connectorType}
      initialConnectionId={connectionIdProp}
      toggleLoader={toggleLoader}
      setIsErrorOnNoWorkSpace={setIsErrorOnNoWorkSpace}
    />
  );
}
