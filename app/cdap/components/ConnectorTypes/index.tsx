import { Box, Paper, styled, Typography } from '@material-ui/core';
import { fetchConnectors } from 'components/Connections/Create/reducer';
import { defaultConnectorTypes } from 'components/WrangleHome/constants/defaultConnectorTypes';
import React, { useEffect, useState } from 'react';
import { GetConnectionIcon, GetIcon } from './iconStore';
import { useConnectorTypesComponentStyles } from './styles';
import { getCurrentNamespace } from 'services/NamespaceStore';
import { Link } from 'react-router-dom';
import { UnderLine } from './iconStore';

const ConnectorTypesComponent = () => {
  const classes = useConnectorTypesComponentStyles();
  const welcomeIcon = GetIcon('welcomeIcon');
  const [connectorTypesList, setConnectorTypesList] = useState([]);

  const fetchConnectorTypeDetails = async () => {
    // fetching the list of connector types
    const fetchedConnectorTypes = await fetchConnectors();
    const connectorTypes = [...defaultConnectorTypes, ...fetchedConnectorTypes];
    // creating list of connector's name & corresponding icon
    const connectorTypesWithImage = connectorTypes.map((connector) => ({
      name: connector.name,
      image: GetConnectionIcon(connector.name),
    }));
    setConnectorTypesList((prev) => [...prev, ...connectorTypesWithImage]);
  };

  useEffect(() => {
    fetchConnectorTypeDetails();
  }, []);

  return (
    <>
      <Paper variant="outlined" elevation={9} className={classes.dashBoard}>
        <Box className={classes.welcomeCardContainer}>
          <Box>{welcomeIcon}</Box>
          <Box className={classes.welcomeTextContainer}>
            <Typography className={classes.welcomeText}>Hi David</Typography>
            <Typography className={classes.welcomeText}>Welcome to Wrangler</Typography>
          </Box>
        </Box>
        <Typography className={classes.subTitle}>Start data exploration</Typography>
        <Box className={classes.underLine}>{UnderLine}</Box>
        <Paper elevation={0} className={classes.flexContainer}>
          {connectorTypesList.map((eachConnectorType) => (
            <Link
              to={`/ns/${getCurrentNamespace()}/datasets-list/${eachConnectorType.name}`}
              className={classes.linkLine}
            >
              <Box className={classes.cardWrapper}>
                <Box className={classes.wrangleCardContent}>
                  {eachConnectorType.image}
                  <Typography variant="body1" className={classes.connectorTypeName}>
                    {eachConnectorType.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          ))}
        </Paper>
      </Paper>
    </>
  );
};

export default ConnectorTypesComponent;
