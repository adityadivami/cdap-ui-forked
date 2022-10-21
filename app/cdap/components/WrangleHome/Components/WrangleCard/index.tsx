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

import { Box, Card, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentNamespace } from 'services/NamespaceStore';
import { getWidgetData } from './services/getWidgetData';
import { useStyles } from './styles';
import { IConnectorArray } from './types';

export default function() {
  const [connectorsData, setConnectorsData] = useState({ connectorTypes: [] });

  const classes = useStyles();
  const connectorTypes: IConnectorArray[] = connectorsData.connectorTypes;

  const updateState = (updatedState) => {
    setConnectorsData(updatedState);
  };

  useEffect(() => {
    getWidgetData(updateState);
  }, []);

  let startIndex = 0;
  let endIndex = 2;
  // Here we are finding out the connections are exist in the app or not
  if (connectorTypes.length > 2) {
    startIndex = 1; // This line is writtern to eliminate the add-connection cards's data from the array
    endIndex = 5;
  }

  return (
    <Box className={classes.wrapper} data-testid="wrangle-card-parent">
      {/* Here we are only showing top 4 connectors on home page */}
      {connectorTypes.slice(startIndex, endIndex).map((item, index) => {
        return (
          <Link
            to={
              startIndex === 0
                ? `/ns/${getCurrentNamespace()}/${item.link}`
                : index === 0
                ? `/ns/${getCurrentNamespace()}/${item.link}`
                : `/ns/${getCurrentNamespace()}/datasources/${item.name}`
            }
            style={{ textDecoration: 'none' }}
            data-testid={'item' + index}
          >
            <Card className={classes.card}>
              <Box className={classes.cardContent} key={index}>
                {item.SVG}
                <Typography className={classes.cardText}>
                  {item.displayName ?? item.name}
                </Typography>
              </Box>
            </Card>
          </Link>
        );
      })}
    </Box>
  );
}
