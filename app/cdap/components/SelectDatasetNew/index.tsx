import { Box, styled } from '@material-ui/core';
import { exploreConnection } from 'components/Connections/Browser/GenericBrowser/apiHelpers';
import { getCategorizedConnections } from 'components/Connections/Browser/SidePanel/apiHelpers';
import { fetchConnectors } from 'components/Connections/Create/reducer';
import * as React from 'react';
import { useState } from 'react';
import ConnectionsTabs from './ConnectionTabs';
import GCSIcon from './SVGs/GCSIcon';
import { useLocation, useParams } from 'react-router';

const SelectDatasetWrapper = styled(Box)({
  display: 'flex',
  marginTop: '48px',
  borderTop: '1px solid #E0E0E0;',
});

const DatasetWrapper = () => {
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const pathFromUrl = queryParams.get('path') || '/';

  const [dataForTabs, setDataForTabs] = useState([
    {
      data: [],
      showTabs: true,
      selectedTab: 'File',
    },
  ]);

  const getConnectionsTabData = async () => {
    let connectorTypes = await fetchConnectors();
    let allConnectionsTotalLength = 0;

    const categorizedConnections = await getCategorizedConnections();
    connectorTypes = connectorTypes.filter((conn): any => {
      return [conn.name];
    });

    connectorTypes = connectorTypes.map((connectorType): any => {
      const connections = categorizedConnections.get(connectorType.name) || [];
      allConnectionsTotalLength = allConnectionsTotalLength + connections.length;

      return {
        ...connectorType,
        count: connections.length,
        SVG: <GCSIcon />,
      };
    });
    const firstLevelData = connectorTypes.map((each) => {
      return {
        name: each.name,
        count: each.count,
      };
    });
    console.log(firstLevelData, 'firstLevelData');
    setDataForTabs((prev): any => {
      const tempData = [...prev];
      tempData[0].data = firstLevelData;
      return tempData;
    });
  };

  const getCategorizedConnectionsforSelectedTab = async (selectedValue: string, index: number) => {
    const categorizedConnections = await getCategorizedConnections();
    const connections = categorizedConnections.get(selectedValue) || [];
    connections.map((each) => {
      fetchEntities(each.name).then((res) => {
        each[`count`] = res.totalCount;
      });
    });
    setDataForTabs((prev): any => {
      const tempData = [...prev];
      tempData.push({ data: [], showTabs: false, selectedTab: '' });
      tempData[index + 1][`data`] = connections;
      tempData[index + 1][`showTabs`] = true;
      tempData[index + 1][`selectedTab`] = connections[0].name;
      return tempData.slice(0, index + 2);
    });
  };

  const fetchEntities = async (connectionId, url = pathFromUrl) => {
    const pathDesired = url ? url : pathFromUrl;
    const entitiesPromise = exploreConnection({
      connectionid: connectionId,
      path: pathDesired,
    });
    return entitiesPromise.then((values) => {
      console.log(values, 'entities fetching....');
      return values;
    });
  };

  const selectedTabValueHandler = (entity: any, index: number) => {
    setDataForTabs((currentData): any => {
      const newData = [...currentData];
      newData[index].selectedTab = entity.name;
      if (index === 0) {
        getCategorizedConnectionsforSelectedTab(entity.name, index);
      } else if (index === 1) {
        fetchEntities(entity.name).then((res) => {
          setDataForTabs((prev): any => {
            const tempData = [...prev];
            tempData.push({ data: [], showTabs: false, selectedTab: '' });
            tempData[index + 1][`data`] = res.entities;
            tempData[index + 1][`showTabs`] = true;
            tempData[index + 1][`selectedTab`] = res.entities[0].name;
            return tempData.slice(0, index + 2);
          });
        });
      } else {
        fetchEntities(dataForTabs[1].selectedTab, entity.path).then((res) => {
          setDataForTabs((prev): any => {
            const tempData = [...prev];
            tempData.push({ data: [], showTabs: false, selectedTab: '' });
            tempData[index + 1][`data`] = res.entities;
            tempData[index + 1][`showTabs`] = true;
            tempData[index + 1][`selectedTab`] = res.entities[0].name;
            return tempData.slice(0, index + 2);
          });
        });
      }
      return newData;
    });
  };

  React.useEffect(() => {
    console.log(dataForTabs, 'dataForTabs');
  }, [dataForTabs]);

  React.useEffect(() => {
    getConnectionsTabData();
  }, []);

  return (
    <SelectDatasetWrapper>
      {dataForTabs.map((each, index) => (
        <ConnectionsTabs
          tabsData={each}
          handleChange={selectedTabValueHandler}
          value={each.selectedTab}
          index={index}
        />
      ))}
    </SelectDatasetWrapper>
  );
};

export default DatasetWrapper;
