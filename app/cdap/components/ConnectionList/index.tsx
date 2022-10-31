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

import { Box, styled, IconButton, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { exploreConnection } from 'components/Connections/Browser/GenericBrowser/apiHelpers';
import { getCategorizedConnections } from 'components/Connections/Browser/SidePanel/apiHelpers';
import { IRecords } from 'components/GridTable/types';
import LoadingSVG from 'components/shared/LoadingSVG';
import ErrorSnackbar from 'components/SnackbarComponent';
import { getWidgetData } from 'components/WrangleHome/Components/WrangleCard/services/getWidgetData';
import T from 'i18n-react';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import NoConnectionsScreen from '../NoRecordScreen';
import ConnectionsTabs from './Components/ConnectionTabs';
import CustomTooltip from './Components/CustomTooltip';
import SubHeader from './Components/SubHeader';
import { InfoGraph } from './icons';
import { useStyles } from './styles';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloseIcon from '@material-ui/icons/Close';
import cloneDeep from 'lodash/cloneDeep';

const SelectDatasetWrapper = styled(Box)({
  overflowX: 'scroll',
  display: 'flex',
  borderTop: `1px solid ${grey[300]}`,

  height: '100%',
  '& > :first-child': {
    minWidth: '280px',
  },
  '& > :not(:first-child)': {
    minWidth: '300px',
  },
});

export default function ConnectionList() {
  const { connectorType } = useParams() as IRecords;

  const refs = useRef([]);
  const headersRefs = useRef([]);
  const classes = useStyles();
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const pathFromUrl = queryParams.get('path') || '/';
  const [loading, setLoading] = useState(true);
  const [isErrorOnNoWorkspace, setIsErrorOnNoWorkSpace] = useState<boolean>(false);
  const [tabSize, setTabSize] = useState(0);
  const toggleLoader = (value: boolean, isError?: boolean) => {
    setLoading(value);
  };
  let connectionId;
  const [dataForTabs, setDataForTabs] = useState([
    {
      data: [],
      showTabs: true,
      selectedTab: null,
      isSearching: false,
    },
  ]);
  const [filteredData, setFilteredData] = useState(cloneDeep(dataForTabs));

  const getConnectionsTabData = async () => {
    let connectorTypes = [];
    let connectorTypesWithSVG = [];
    const connectorTypesWithIcons = (data) => {
      connectorTypesWithSVG = data.connectorTypes;
    };
    // Fetching the all available connectors list with icons
    await getWidgetData(connectorTypesWithIcons);
    connectorTypes = connectorTypesWithSVG;

    let allConnectionsTotalLength = 0;

    // Fetching all the connections list inside each connector type
    const categorizedConnections = await getCategorizedConnections();
    connectorTypes = connectorTypes.filter((conn) => {
      return [conn.name];
    });
    // Mapping connector types and corresponding connections
    connectorTypes = connectorTypes.map((eachConnectorType) => {
      const connections = categorizedConnections.get(eachConnectorType.name) || [];
      allConnectionsTotalLength = allConnectionsTotalLength + connections.length;
      return {
        ...eachConnectorType,
        count: connections.length,
        icon: eachConnectorType.SVG,
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
    setLoading(false);
    setDataForTabs((prev) => {
      const tempData = [...prev];
      tempData[0].data = firstLevelData;
      return tempData;
    });
  };

  const setDataForTabsHelper = (res, index) => {
    setDataForTabs((prev) => {
      const tempData = [...prev];
      tempData.push({
        data: [],
        showTabs: false,
        selectedTab: '',
        isSearching: false,
      });
      if (res.entities) {
        tempData[index + 1][`data`] = res.entities;
      } else {
        tempData[index + 1][`data`] = res;
      }
      tempData[index + 1][`showTabs`] = true;
      tempData[index + 1][`selectedTab`] = null;
      tempData[index + 1][`isSearching`] = false;
      return tempData.slice(0, index + 2);
    });
  };

  const getCategorizedConnectionsforSelectedTab = async (selectedValue: string, index: number) => {
    const categorizedConnections = await getCategorizedConnections();
    const connections = categorizedConnections.get(selectedValue) || [];
    setDataForTabsHelper(connections, index);
    toggleLoader(false);
  };

  const fetchEntities = async (connectionName, url = pathFromUrl) => {
    const pathDesired = url ? url : pathFromUrl;
    const entitiesPromise = exploreConnection({
      connectionid: connectionName,
      path: pathDesired,
    });
    return entitiesPromise.then((values) => {
      return values;
    });
  };

  const makeCursorFocused = (index: number) => {
    refs.current[index].focus();
  };

  const selectedTabValueHandler = (entity: IRecords, index: number) => {
    toggleLoader(true);
    setDataForTabs((currentData) => {
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
        getCategorizedConnectionsforSelectedTab(entity.name as string, index);
      } else if (index === 1) {
        fetchEntities(entity.name)
          .then((res) => {
            setDataForTabsHelper(res, index);
            toggleLoader(false);
          })
          .catch((error) => {
            console.log('Failed to explore connection.', error.message);
            toggleLoader(false);
            setIsErrorOnNoWorkSpace(true);
            // TODO : Need to bind the message on Snackbar . The message is inside error.message same as the old UI
          });
      } else {
        if (entity.canBrowse) {
          fetchEntities(dataForTabs[1].selectedTab, entity.path as string)
            .then((res) => {
              setDataForTabsHelper(res, index);
              toggleLoader(false);
            })
            .catch((error) => {
              console.log('Error while Browsing', error.message);
              toggleLoader(false);
              setIsErrorOnNoWorkSpace(true);
              // TODO : Need to bind the message on Snackbar
            });
        }
      }
      return newData;
    });
  };

  const searchHandler = (index: number) => {
    setDataForTabs((prev) => {
      let tempData = [...prev];
      tempData = tempData.map((each) => {
        return {
          ...each,
          isSearching: false,
        };
      });
      tempData[index].isSearching = true;
      tempData.forEach((each, ind) => {
        if (ind === index) {
          each.isSearching = true;
        } else {
          each.isSearching = false;
        }
      });
      return tempData;
    });
    refs.current[index].focus();
  };

  const handleSearch = (e: any, index: number) => {
    const val = e.target.value.toLowerCase();
    const newData = cloneDeep(dataForTabs);
    const newDataToSearch = [...newData[index].data];
    const tempData = newDataToSearch.filter((item: any) => item.name.toLowerCase().includes(val));
    newData[index].data = [...tempData];
    setFilteredData(cloneDeep(newData));
  };

  const handleClearSearch = (e: any, index: number) => {
    if (refs.current[index].value == '') {
      setDataForTabs((prev) => {
        const tempData = [...prev];
        tempData[index].isSearching = false;
        return tempData;
      });
    } else {
      refs.current[index].value = '';
      const newData = cloneDeep(dataForTabs);
      const newDataToSearch = [...newData[index].data];
      const tempData = newDataToSearch.filter((item: any) => item.name.toLowerCase().includes(''));
      newData[index].data = [...tempData];
      setFilteredData(cloneDeep(newData));
    }
  };

  useEffect(() => {
    getConnectionsTabData();
  }, []);

  useEffect(() => {
    const newData = cloneDeep(dataForTabs);
    setFilteredData(newData);
  }, [dataForTabs]);

  useEffect(() => {
    setDataForTabs((prev) => {
      const temp = prev;
      temp[0].selectedTab = connectorType;
      return temp;
    });
    getCategorizedConnectionsforSelectedTab(connectorType as string, 0);
  }, [connectorType]);

  const headerForLevelZero = () => {
    return (
      <Box className={classes.styleForLevelZero}>
        <Typography variant="body2">Data Connections</Typography>
      </Box>
    );
  };

  useEffect(() => {
    setTabSize(dataForTabs.length);
  }, [dataForTabs.length]);

  let headerContent;

  return (
    <Box data-testid="data-sets-parent" className={classes.connectionsListContainer}>
      <SubHeader selectedConnection={dataForTabs[0]?.selectedTab} />

      {dataForTabs &&
      Array.isArray(dataForTabs) &&
      dataForTabs.length &&
      dataForTabs[0]?.data?.length > 0 ? (
        <Box className={classes.connectionsWithInfo}>
          <SelectDatasetWrapper>
            {filteredData &&
              Array.isArray(filteredData) &&
              filteredData.map((each, index) => {
                if (each.data.filter((el) => el.connectionId).length) {
                  connectionId = each.data.filter((el) => el.connectionId)[0].connectionId;
                }
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
                        {headersRefs.current[index]?.offsetWidth <
                        headersRefs.current[index]?.scrollWidth ? (
                          <CustomTooltip title={dataForTabs[index - 1].selectedTab} arrow>
                            <Typography
                              variant="body2"
                              ref={(element) => {
                                headersRefs.current[index] = element;
                              }}
                            >
                              {filteredData[index - 1].selectedTab}
                            </Typography>
                          </CustomTooltip>
                        ) : (
                          <Typography
                            variant="body2"
                            ref={(element) => {
                              headersRefs.current[index] = element;
                            }}
                          >
                            {filteredData[index - 1].selectedTab}
                          </Typography>
                        )}

                        <Box
                          onClick={() => {
                            searchHandler(index);
                          }}
                        >
                          <IconButton>
                            <SearchRoundedIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box
                        className={
                          each.isSearching ? classes.afterSearchIconClick : classes.hideComponent
                        }
                        onMouseOver={() => makeCursorFocused(index)}
                      >
                        <SearchRoundedIcon />
                        <input
                          type="text"
                          className={classes.searchBar}
                          onChange={(e) => handleSearch(e, index)}
                          ref={(e) => {
                            refs.current[index] = e;
                          }}
                        />
                        <Box
                          className={classes.closeIcon}
                          onClick={(e) => handleClearSearch(e, index)}
                        >
                          <CloseIcon />
                        </Box>
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
                      connectionId={connectionId || ''}
                      toggleLoader={(value: boolean, isError?: boolean) =>
                        toggleLoader(value, isError)
                      }
                      setIsErrorOnNoWorkSpace={setIsErrorOnNoWorkSpace}
                    />
                  </Box>
                );
              })}
          </SelectDatasetWrapper>
          {tabSize < 4 && (
            <Box className={classes.infographContainer}>
              <Box className={classes.infograph}>
                <InfoGraph />
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <NoConnectionsScreen
          title={T.translate('features.NewWranglerUI.NoRecordScreen.connectionsList.title')}
          subtitle={T.translate('features.NewWranglerUI.NoRecordScreen.connectionsList.subtitle')}
        />
        // TODO: No connectors types are available screen needs to be appended here
      )}
      {loading && (
        <div className={classes.loadingContainer}>
          <LoadingSVG />
        </div>
      )}
      {isErrorOnNoWorkspace && (
        <ErrorSnackbar handleCloseError={() => setIsErrorOnNoWorkSpace(false)} />
      )}
    </Box>
  );
}
