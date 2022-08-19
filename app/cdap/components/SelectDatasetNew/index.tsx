import { Box, Input, styled, Typography } from '@material-ui/core';
import { exploreConnection } from 'components/Connections/Browser/GenericBrowser/apiHelpers';
import { getCategorizedConnections } from 'components/Connections/Browser/SidePanel/apiHelpers';
import { fetchConnectors } from 'components/Connections/Create/reducer';
import * as React from 'react';
import { useState } from 'react';
import ConnectionsTabs from './ConnectionTabs';
import { GCSIcon } from './SVGs/GCSIcon';
import { useLocation, useParams } from 'react-router';
import BreadCumb from './BreadCumb';
import { useStyles } from './styles';
import { SearchIcon } from './SVGs/wrangleIcon';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const SelectDatasetWrapper = styled(Box)({
  display: 'flex',
  borderTop: '1px solid #E0E0E0;',
  overflow: 'auto',
  height: '100%',
  borderRight: '1px dashed #DADCE0',
});

const DatasetWrapper = () => {
  const classes = useStyles();
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const pathFromUrl = queryParams.get('path') || '/';

  const [dataForTabs, setDataForTabs] = useState([
    {
      data: [],
      showTabs: true,
      selectedTab: null,
      isSearching: false,
    },
  ]);

  const [filteredDataForTabs, setFilteredDataForTabs] = useState(
    JSON.parse(JSON.stringify(dataForTabs))
  );
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
    const firstLevelData = connectorTypes.filter((each) => {
      if (each.count > 0) {
        return {
          name: each.name,
          count: each.count,
        };
      }
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
    // connections.map((each) => {
    //   fetchEntities(each.name).then((res) => {
    //     each[`count`] = res.totalCount;
    //   });
    // });
    setDataForTabs((prev): any => {
      const tempData = [...prev];
      tempData.push({
        data: [],
        showTabs: false,
        selectedTab: '',
        isSearching: false,
      });
      tempData[index + 1][`data`] = connections;
      tempData[index + 1][`showTabs`] = true;
      // tempData[index + 1][`selectedTab`] = connections[0].name;
      tempData[index + 1][`selectedTab`] = null;
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
      let newData = [...currentData];
      newData[index].selectedTab = entity.name;
      newData = newData.map((each) => {
        return {
          data: each.data,
          showTabs: each.showTabs,
          selectedTab: each.selectedTab,
          isSearching: false,
        };
      });
      if (index === 0) {
        getCategorizedConnectionsforSelectedTab(entity.name, index);
      } else if (index === 1) {
        fetchEntities(entity.name).then((res) => {
          setDataForTabs((prev): any => {
            const tempData = [...prev];
            tempData.push({
              data: [],
              showTabs: false,
              selectedTab: '',
              isSearching: false,
            });
            tempData[index + 1][`data`] = res.entities;
            tempData[index + 1][`showTabs`] = true;
            tempData[index + 1][`selectedTab`] = null;
            tempData[index + 1][`isSearching`] = false;
            // tempData[index + 1][`selectedTab`] = res.entities[0].name;
            return tempData.slice(0, index + 2);
          });
        });
      } else {
        if (entity.canBrowse) {
          fetchEntities(dataForTabs[1].selectedTab, entity.path).then((res) => {
            setDataForTabs((prev): any => {
              const tempData = [...prev];
              tempData.push({
                data: [],
                showTabs: false,
                selectedTab: '',
                isSearching: false,
              });
              tempData[index + 1][`data`] = res.entities;
              tempData[index + 1][`showTabs`] = true;
              // tempData[index + 1][`selectedTab`] = res.entities[0].name;
              tempData[index + 1][`selectedTab`] = null;
              tempData[index + 1][`isSearching`] = false;
              return tempData.slice(0, index + 2);
            });
          });
        }
      }
      return newData;
    });
  };

  React.useEffect(() => {
    getConnectionsTabData();
  }, []);

  const searchHandler = (index: number) => {
    setDataForTabs((prev) => {
      const tempData = [...prev];
      tempData[index].isSearching = true;
      return tempData;
    });
  };

  const headerForLevelZero = () => {
    return (
      <Box className={classes.StyleForLevelZero}>
        <Typography>Data Connections</Typography>
      </Box>
    );
  };

  let headerContent;

  const handleChange = (e: any, index: number) => {
    console.log(e.target.value, 'this is e target value');
    const val = e.target.value;
    const newd = JSON.parse(JSON.stringify(dataForTabs));
    newd.forEach((each: any, eachIndex: number) => {
      if (eachIndex === index) {
        each.data = each.data.filter((item: any, itemIndex: number) => item.name.includes(val));
        each.selectedTab = each.data[0].name;
      }
    });

    console.log(dataForTabs, 'this is dataForTabs');
    console.log(newd, 'this is newd');
    setDataForTabs(newd);
  };

  return (
    <>
      <BreadCumb />
      <SelectDatasetWrapper>
        {dataForTabs &&
          Array.isArray(dataForTabs) &&
          dataForTabs.map((each, index) => {
            if (index === 0) {
              headerContent = headerForLevelZero();
            } else {
              headerContent = (
                <>
                  <Box
                    className={
                      each.isSearching
                        ? classes.hideComponent
                        : classes.beforeSearchIconClickDisplay
                    }
                  >
                    <Typography>{dataForTabs[index - 1].selectedTab}</Typography>
                    <Box
                      onClick={() => {
                        return false;
                        searchHandler(index);
                      }}
                    >
                      <SearchIcon />
                    </Box>
                  </Box>
                  <Box
                    className={
                      each.isSearching ? classes.afterSearchIconClick : classes.hideComponent
                    }
                  >
                    <Input onChange={(e: any) => handleChange(e, index)} />
                  </Box>
                </>
              );
            }
            return (
              <Box className={classes.tabsContainerWithHeader}>
                <Box className={classes.tabHeaders}>{headerContent}</Box>
                <ConnectionsTabs
                  tabsData={each}
                  handleChange={selectedTabValueHandler}
                  value={each.selectedTab}
                  index={index}
                />
              </Box>
            );
          })}
      </SelectDatasetWrapper>
    </>
  );
};

export default DatasetWrapper;
