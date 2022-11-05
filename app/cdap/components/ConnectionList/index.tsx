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

import { Box, styled, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import ConnectionsTabs from 'components/ConnectionList/Components/ConnectionTabs';
import HeaderContent from 'components/ConnectionList/Components/HeaderContent';
import SubHeader from 'components/ConnectionList/Components/SubHeader';
import { PREFIX } from 'components/ConnectionList/constants';
import { InfoGraph } from 'components/ConnectionList/IconStore/InfoGraph';
import { useStyles } from 'components/ConnectionList/styles';
import { IFilteredData } from 'components/ConnectionList/types';
import { exploreConnection } from 'components/Connections/Browser/GenericBrowser/apiHelpers';
import { getCategorizedConnections } from 'components/Connections/Browser/SidePanel/apiHelpers';
import { IRecords } from 'components/GridTable/types';
import NoRecordScreen from 'components/NoRecordScreen';
import LoadingSVG from 'components/shared/LoadingSVG';
import ErrorSnackbar from 'components/SnackbarComponent';
import { getWidgetData } from 'components/WrangleHome/Components/WrangleCard/services/getWidgetData';
import T from 'i18n-react';
import cloneDeep from 'lodash/cloneDeep';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [isErrorOnNoWorkspace, setIsErrorOnNoWorkSpace] = useState<boolean>(false);
  const [tabsLength, setTabsLength] = useState<number>(0);
  const toggleLoader = (value: boolean, isError?: boolean) => {
    setLoading(value);
  };
  let connectionId;
  const [dataForTabs, setDataForTabs] = useState<IFilteredData[]>([
    {
      data: [],
      showTabs: true,
      selectedTab: null,
      toggleSearch: false,
    },
  ]);
  const [filteredData, setFilteredData] = useState<IFilteredData>(cloneDeep(dataForTabs));

  const getConnectionsTabData = async () => {
    let connectorTypes = [];
    let connectorTypesWithSVG = [];
    const connectorTypesWithIcons = (data) => {
      connectorTypesWithSVG = data?.connectorTypes;
    };
    // Fetching all the available connectors list with icons
    await getWidgetData(connectorTypesWithIcons);
    connectorTypes = connectorTypesWithSVG;
    let allConnectionsTotalLength = 0;

    // Fetching all the connections list inside each connector type
    const categorizedConnections = await getCategorizedConnections();
    connectorTypes = connectorTypes.filter((conn) => {
      return [conn.name];
    });
    // Mapping connector types and corresponding connections
    connectorTypes = connectorTypes?.map((eachConnectorType) => {
      const connections = categorizedConnections.get(eachConnectorType.name) || [];
      allConnectionsTotalLength = allConnectionsTotalLength + connections.length;
      return {
        ...eachConnectorType,
        count: connections.length,
        icon: eachConnectorType.SVG,
      };
    });

    // Connector types which has connections inside it
    const firstLevelData = connectorTypes.filter((eachConnectorType) => {
      if (eachConnectorType.count > 0) {
        return true;
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
        toggleSearch: false,
      });
      if (res.entities) {
        tempData[index + 1][`data`] = res.entities;
      } else {
        tempData[index + 1][`data`] = res;
      }
      tempData[index + 1][`showTabs`] = true;
      tempData[index + 1][`selectedTab`] = null;
      tempData[index + 1][`toggleSearch`] = false;
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
      newData = newData.map((eachNewData) => {
        return {
          data: eachNewData.data,
          showTabs: eachNewData.showTabs,
          selectedTab: eachNewData.selectedTab,
          toggleSearch: false,
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
            toggleLoader(false);
            setIsErrorOnNoWorkSpace(true);
            // TODO : Need to bind the message on Snackbar . The message is in error.message same as the old UI . Remove the console log later
          });
      } else {
        if (entity.canBrowse) {
          fetchEntities(dataForTabs[1].selectedTab, entity.path as string)
            .then((res) => {
              setDataForTabsHelper(res, index);
              toggleLoader(false);
            })
            .catch((error) => {
              toggleLoader(false);
              setIsErrorOnNoWorkSpace(true);
              // TODO : Need to bind the message on Snackbar. Remove the console log later
            });
        }
      }
      return newData;
    });
  };

  const searchHandler = (index: number) => {
    setDataForTabs((prev) => {
      let tempData = [...prev];
      tempData = tempData.map((eachTempData) => ({
        ...eachTempData,
        toggleSearch: false,
      }));
      tempData[index].toggleSearch = true;
      tempData.forEach((eachTempData, tempDataIndex) => {
        if (tempDataIndex === index) {
          eachTempData.toggleSearch = true;
        } else {
          eachTempData.toggleSearch = false;
        }
      });
      return tempData;
    });
    refs.current[index].focus();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.toLowerCase();
    const newData = cloneDeep(dataForTabs);
    const newDataToSearch = [...newData[index].data];
    const tempData = newDataToSearch.filter((item: any) => item.name.toLowerCase().includes(val));
    newData[index].data = [...tempData];
    setFilteredData(cloneDeep(newData));
  };

  const handleClearSearch = (e: React.MouseEvent<HTMLInputElement>, index: number) => {
    if (refs.current[index].value === '') {
      setDataForTabs((prev) => {
        const tempData = [...prev];
        tempData[index].toggleSearch = false;
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
    setFilteredData(cloneDeep(dataForTabs));
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
        <Typography variant="body2" component="div">
          Data Connections
        </Typography>
      </Box>
    );
  };

  useEffect(() => {
    setTabsLength(dataForTabs?.length);
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
              filteredData?.map((eachFilteredData, index) => {
                if (
                  eachFilteredData.data.filter((eachFilterItem) => eachFilterItem.connectionId)
                    .length
                ) {
                  connectionId = eachFilteredData.data.filter(
                    (eachFilterItem) => eachFilterItem.connectionId
                  )[0].connectionId;
                }
                if (index === 0) {
                  headerContent = headerForLevelZero();
                } else {
                  headerContent = (
                    <HeaderContent
                      eachFilteredData={eachFilteredData}
                      headersRefs={headersRefs}
                      index={index}
                      dataForTabs={dataForTabs}
                      filteredData={filteredData}
                      searchHandler={searchHandler}
                      makeCursorFocused={makeCursorFocused}
                      handleSearch={handleSearch}
                      refs={refs}
                      handleClearSearch={handleClearSearch}
                    />
                  );
                }
                return (
                  <Box className={classes.tabsContainerWithHeader}>
                    <Box className={classes.tabHeaders}>{headerContent}</Box>
                    <ConnectionsTabs
                      tabsData={eachFilteredData}
                      handleChange={selectedTabValueHandler}
                      value={eachFilteredData.selectedTab}
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
          {tabsLength < 4 && (
            <Box className={classes.infographContainer}>
              <Box className={classes.infograph}>
                <InfoGraph />
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <>
          {loading && (
            <NoRecordScreen
              title={T.translate(`${PREFIX}.NoRecordScreen.connectionsList.title`)}
              subtitle={T.translate(`${PREFIX}.NoRecordScreen.connectionsList.subtitle`)}
            />
          )}
        </>
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
