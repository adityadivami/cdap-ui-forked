import { Box, Card, Typography } from '@material-ui/core';
import { fetchConnectors } from 'components/Connections/Create/reducer';
import React, { useEffect, useState } from 'react';
import { GCSIcon } from './icons/GCSIcon';
import { ImportDatasetIcon } from './icons/ImportDatasetIcon';
import { useStyles } from './styles';

const WrangleCard = () => {
  const [state, setState] = useState({
    connectorTypes: [],
  });
  const getConnectorTypesNames = async () => {
    let connectorTypes = await fetchConnectors();
    console.log(connectorTypes, 'qqqqqwwwwwwwweeeeeerrrrrrttttttyyyyyy');
    connectorTypes = connectorTypes.map((connectorType) => {
      return {
        ...connectorType,
        SVG: GCSIcon,
      };
    });
    connectorTypes.unshift({
      name: 'Imported Datasets',
      type: 'default',
      category: 'default',
      description: 'All Connections from the List',
      artifact: {
        name: 'allConnections',
        version: 'local',
        scope: 'local',
      },

      SVG: ImportDatasetIcon,
    });

    setState({
      connectorTypes,
    });
  };
  useEffect(() => {
    getConnectorTypesNames();
  }, []);
  const classes = useStyles();
  const connectorTypes = state.connectorTypes;
  return (
    <Box className={classes.wrapper} data-testid="wrangle-card-parent">
      {connectorTypes.map((item, index) => {
        return (
          <Card className={classes.card}>
            <Box className={classes.cardContent} key={index}>
              {item.SVG}
              <Typography className={classes.cardText}>{item.name}</Typography>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};
export default WrangleCard;
