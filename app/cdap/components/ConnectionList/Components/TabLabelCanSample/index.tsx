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
import Box from '@material-ui/core/Box';
import { IConnectorTabType } from 'components/ConnectionList/Components/ConnectionTabs/types';
import CustomTooltip from 'components/ConnectionList/Components/CustomTooltip';
import TabLabelItem from 'components/ConnectionList/Components/LabelItemCanSample';
import { WrangleIcon } from 'components/ConnectionList/IconStore/WrangleIcon';
import { createWorkspace } from 'components/Connections/Browser/GenericBrowser/apiHelpers';
import { ConnectionsContext } from 'components/Connections/ConnectionsContext';
import T from 'i18n-react';
import React, { createRef, Ref, useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { getCurrentNamespace } from 'services/NamespaceStore';

import { Dispatch, SetStateAction } from 'react';

export interface ITabLabelSampleItemProps {
  label: string;
  myLabelRef: Ref<HTMLSpanElement>;
  onExplore: (entity: IConnectorTabType) => void;
  entity: IConnectorTabType;
  buttonTestId: string;
  buttonElement: JSX.Element;
}

export interface ITabLabelCanSampleProps {
  label: string;
  entity: IConnectorTabType;
  initialConnectionId: string;
  toggleLoader: (value: boolean, isError?: boolean) => void;
  setIsErrorOnNoWorkSpace: Dispatch<SetStateAction<boolean>>;
}

export default function({
  label,
  entity,
  initialConnectionId,
  toggleLoader,
  setIsErrorOnNoWorkSpace,
}: ITabLabelCanSampleProps) {
  const myLabelRef: Ref<HTMLSpanElement> = createRef();
  const [refValue, setRefValue] = useState<boolean>(false);
  const [workspaceId, setWorkspaceId] = useState<string>(null);
  const [currentConnection, setCurrentConnection] = useState<string>(initialConnectionId);

  const { onWorkspaceCreate } = useContext(ConnectionsContext);

  useEffect(() => {
    setRefValue(myLabelRef?.current?.offsetWidth < myLabelRef?.current?.scrollWidth);
  }, []);

  const onExplore = (currentEntity: IConnectorTabType) => {
    const { canBrowse, canSample } = currentEntity;
    if (!canBrowse && canSample) {
      onCreateWorkspace(currentEntity);
    } else {
      setIsErrorOnNoWorkSpace(true);
    }
  };

  const onCreateWorkspace = (currentEntity: IConnectorTabType) => {
    try {
      createWorkspaceInternal(currentEntity);
    } catch (e) {
      setIsErrorOnNoWorkSpace(true);
    }
  };

  const createWorkspaceInternal = (currentEntity: IConnectorTabType) => {
    toggleLoader(true);
    createWorkspace({
      entity: currentEntity,
      connection: currentConnection,
      properties: {},
    })
      // NOTE: As the function is returning promise, we are using .then here
      .then((res) => {
        if (onWorkspaceCreate) {
          return onWorkspaceCreate(res);
        }
        if (res) {
          setWorkspaceId(res);
          toggleLoader(false);
        }
      })
      .catch((err) => {
        toggleLoader(false);
        setIsErrorOnNoWorkSpace(true);
      });
  };

  const indexOfSelectedDataset: number = location.pathname.lastIndexOf('/');
  const requiredPath: string = location.pathname.slice(indexOfSelectedDataset + 1);

  return workspaceId ? (
    <Redirect
      to={{
        pathname: `/ns/${getCurrentNamespace()}/wrangler-grid/${workspaceId}`,
        state: {
          from: T.translate('features.WranglerNewUI.Breadcrumb.labels.connectionsList'),
          path: requiredPath,
        },
      }}
    />
  ) : refValue ? (
    <CustomTooltip title={label} arrow data-testid="connections-tab-ref-label-simple">
      <Box>
        <TabLabelItem
          label={label}
          myLabelRef={myLabelRef}
          onExplore={onExplore}
          entity={entity}
          buttonTestId="connections-tab-ref-explore"
          buttonElement={
            <Box className="wranglingHover">
              <WrangleIcon />
              <Typography color="primary" variant="body2" component="span">
                {T.translate('features.WranglerNewUI.ConnectionsList.labels.loadToGrid')}
              </Typography>
            </Box>
          }
        />
      </Box>
    </CustomTooltip>
  ) : (
    <TabLabelItem
      label={label}
      myLabelRef={myLabelRef}
      onExplore={onExplore}
      entity={entity}
      buttonTestId="connections-tab-explore"
      buttonElement={
        <Box className="wranglingHover">
          <WrangleIcon />
          <Typography variant="body2" color="primary" component="span">
            {T.translate('features.WranglerNewUI.ConnectionsList.labels.loadToGrid')}
          </Typography>
        </Box>
      }
    />
  );
}
