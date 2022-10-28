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

import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import {
  ConnectionTab,
  useStyles,
} from 'components/ConnectionList/Components/ConnectionTabs/styles';
import React, { useEffect, useState } from 'react';
import TabLabelCanBrowse from '../TabLabelCanBrowse';
import TabLabelCanSample from '../TabLabelCanSample';
import { IConnectionTabsProps } from './types';

export default function ConnectionsTabs({
  tabsData,
  handleChange,
  value,
  index,
  connectionId,
  setToaster,
  toggleLoader,
}: IConnectionTabsProps) {
  const classes = useStyles();
  // console.log(tabsData);
  const [connectionIdProp, setConnectionId] = useState(connectionId);

  useEffect(() => {
    setConnectionId(connectionId);
  }, []);

  return (
    <Box data-testid="connections-tabs-parent" className={classes.connectionsTabsParent}>
      {tabsData.showTabs && (
        <div className={classes.boxStyles} data-testid="connection-tabs">
          <Tabs
            value={value}
            orientation="vertical"
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            TabIndicatorProps={{
              className: classes.tabIndicatorStyles,
            }}
            classes={{
              indicator: classes.indicator,
              root: classes.tabsContainer,
            }}
          >
            {tabsData.data.map((connectorType, connectorTypeIndex) => (
              <ConnectionTab
                role="button"
                data-testid="connections-tab-button"
                onClick={() => {
                  if (index > 1) {
                    if (connectorType.canBrowse) {
                      handleChange(connectorType, index);
                    }
                  } else {
                    handleChange(connectorType, index);
                  }
                }}
                label={
                  index > 1 ? (
                    connectorType.canBrowse ? (
                      <TabLabelCanBrowse
                        count={undefined}
                        label={connectorType.name}
                        index={index}
                      />
                    ) : (
                      <TabLabelCanSample
                        label={connectorType.name}
                        entity={connectorType}
                        initialConnectionId={connectionIdProp}
                        toggleLoader={toggleLoader}
                        setToaster={setToaster}
                      />
                    )
                  ) : (
                    <TabLabelCanBrowse
                      label={connectorType.name}
                      count={index === 0 ? connectorType.count : undefined}
                      index={index}
                      icon={connectorType.icon}
                    />
                  )
                }
                value={connectorType.name}
                disableTouchRipple
                key={`${connectorType.name}=${connectorTypeIndex}`}
                id={connectorType.name}
                className={index > 1 && !connectorType.canBrowse ? classes.wrangleTab : null}
              />
            ))}
          </Tabs>
        </div>
      )}
    </Box>
  );
}
