/*
 * Copyright © 2021 Cask Data, Inc.
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

import * as React from 'react';
import { CategorizedConnectors } from 'components/Connections/Create/CategorizedConnectors';
import makeStyle from '@material-ui/core/styles/makeStyles';
import { EntityTopPanel } from 'components/EntityTopPanel';
import {
  initStore,
  reducer,
  initialState,
  ICreateConnectionSteps,
  navigateToConfigStep,
  navigateToConnectionCategoryStep,
  navigateToConnectionList,
  IConnectorDetails,
  fetchConnectionDetails,
  createConnection,
  getConnection,
} from 'components/Connections/Create/reducer';
import If from 'components/If';
import LoadingSVGCentered from 'components/LoadingSVGCentered';
import { Redirect } from 'react-router';
import { getCurrentNamespace } from 'services/NamespaceStore';
import { ConnectionConfiguration } from 'components/Connections/Create/ConnectionConfiguration';
import { extractErrorMessage, objectQuery } from 'services/helpers';
import { ConnectionsApi } from 'api/connections';
import Alert from 'components/Alert';

const useStyle = makeStyle(() => {
  return {
    root: {
      display: 'grid',
      gridTemplateRows: '50px minmax(calc(100% - 50px), 1fr)',
      height: '100%',
    },
    topPanel: {
      padding: '0 0 0 20px',
    },
  };
});
export function CreateConnection({
  enableRouting,
  onToggle = null,
  initialConfig = {},
  onCreate = null,
  isEdit = false,
}) {
  const classes = useStyle();
  const [loading, setLoading] = React.useState(true);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const activeCategory = React.useRef(null);
  const [connectionDetails, setConnectionDetails] = React.useState<IConnectorDetails>({
    connectorWidgetJSON: null,
    connectorProperties: null,
    connectorDoc: null,
  });
  const [initValues, setInitValues] = React.useState({});
  const [error, setError] = React.useState(null);

  const init = async () => {
    try {
      await initStore(dispatch);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    init();

    if (initialConfig && Object.keys(initialConfig).length > 0) {
      const plugin = objectQuery(initialConfig, 'plugin') || {};
      const selectedConnector = {
        artifact: plugin.artifact,
        category: plugin.category,
        name: plugin.name,
        type: plugin.type,
      };

      setInitValues({
        initName: objectQuery(initialConfig, 'name'),
        initDescription: objectQuery(initialConfig, 'description'),
        initProperties: objectQuery(plugin, 'properties'),
      });
      onConnectorSelection(selectedConnector);
    }
  }, []);

  if (enableRouting && state.activeStep === ICreateConnectionSteps.CONNECTOR_LIST) {
    return <Redirect to={`/ns/${getCurrentNamespace()}/connections`} />;
  }

  const onConnectorSelection = async (selectedConnector) => {
    navigateToConfigStep(dispatch, selectedConnector);
    setLoading(true);
    const connDetails = await fetchConnectionDetails(selectedConnector);
    setConnectionDetails(connDetails);
    setLoading(false);
  };

  const onConnectionCreate = async (connectionFormData) => {
    const { description, properties, name } = connectionFormData;

    if (!isEdit) {
      // validate existing connection name
      try {
        await getConnection(name);
        setError(`Connection '${name}' already exists.`);
        return;
      } catch (e) {
        // no-op. We want the connection to be not found.
      }
    }

    const { selectedConnector } = state;
    const connectionConfiguration = {
      description,
      category: state.selectedConnector.category,
      plugin: {
        ...selectedConnector,
        properties,
      },
    };
    try {
      await createConnection(name, connectionConfiguration);

      if (typeof onCreate === 'function') {
        onCreate();
      }

      if (enableRouting) {
        navigateToConnectionList(dispatch);
      }

      if (typeof onToggle === 'function') {
        onToggle();
      }
    } catch (e) {
      const errorMsg = extractErrorMessage(e);
      setError(errorMsg);
    }
  };

  function onClose() {
    if (enableRouting) {
      navigateToConnectionList(dispatch);
      return;
    }

    onToggle();
  }

  return (
    <div className={classes.root}>
      <If condition={state.activeStep === ICreateConnectionSteps.CONNECTOR_CONFIG}>
        <EntityTopPanel
          historyBack={false}
          breadCrumbAnchorLabel="Select Connection"
          onBreadCrumbClick={() => navigateToConnectionCategoryStep(dispatch)}
          title="Create a connection"
          closeBtnAnchorLink={onClose}
          className={classes.topPanel}
        />
      </If>
      <If condition={state.activeStep === ICreateConnectionSteps.CONNECTOR_SELECTION}>
        <EntityTopPanel
          title="Add a connection"
          closeBtnAnchorLink={onClose}
          className={classes.topPanel}
        />
      </If>
      <If condition={loading}>
        <LoadingSVGCentered />
      </If>
      <If condition={state.activeStep === ICreateConnectionSteps.CONNECTOR_SELECTION}>
        <CategorizedConnectors
          onActiveCategory={(active) => (activeCategory.current = active)}
          connectorsMap={state.categoriesToConnectorsMap}
          onConnectorSelection={onConnectorSelection}
        />
      </If>
      <If condition={state.activeStep === ICreateConnectionSteps.CONNECTOR_CONFIG}>
        <ConnectionConfiguration
          connectorProperties={connectionDetails.connectorProperties}
          connectorWidgetJSON={connectionDetails.connectorWidgetJSON}
          connectorDoc={connectionDetails.connectorDoc}
          onConnectionCreate={onConnectionCreate}
          initValues={initValues}
          isEdit={isEdit}
        />
      </If>

      <If condition={!!error}>
        <Alert message={error} type="error" showAlert={true} onClose={() => setError(null)} />
      </If>
    </div>
  );
}
