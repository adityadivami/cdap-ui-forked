import { Box, Paper, Typography } from '@material-ui/core';
import { fetchConnectors } from 'components/Connections/Create/reducer';
import { defaultConnectorTypes } from 'components/WrangleHome/constants/defaultConnectorTypes';
import React, { useEffect, useState } from 'react';
import WranglerCard from './ConnectorTypeCard';
import { GetConnectionIcon } from './iconStore';
import { useConnectorTypesComponentStyles } from './styles';
import WelcomeCard from './WelcomeCard';
import { getCurrentNamespace } from 'services/NamespaceStore';
import { Link } from 'react-router-dom';
import { UnderLine } from './iconStore';
import './Assets/NotoSans-Regular.ttf';
import './styles.scss';

const ConnectorTypesComponent = () => {
  const classes = useConnectorTypesComponentStyles();

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
        <WelcomeCard />
        <Typography className={classes.subTitle}>Start data exploration</Typography>
        <Box className={classes.underLine}>{UnderLine}</Box>
        <Paper elevation={0} className={classes.flexContainer}>
          {connectorTypesList.map((eachConnectorType) => (
            <Link
              to={`/ns/${getCurrentNamespace()}/datasets-list/${eachConnectorType.name}`}
              className={classes.linkLine}
            >
              <WranglerCard
                key={eachConnectorType.name}
                name={eachConnectorType.name}
                image={eachConnectorType.image}
              />
            </Link>
          ))}
        </Paper>
      </Paper>
    </>
  );
};

export default ConnectorTypesComponent;
