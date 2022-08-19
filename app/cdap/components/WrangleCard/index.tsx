import { Box, Card, Typography } from '@material-ui/core';
import { fetchConnectors } from 'components/Connections/Create/reducer';
import React, { useEffect, useState } from 'react';
import { Bigquery } from './icons/Bigquery';
import { CloudSQLMySQL } from './icons/CloudSQLMySQL';
import { CloudSQLPostGreSQL } from './icons/CloudSQLPostGreSQL';
import { Database } from './icons/Database';
import { GCS } from './icons/GCS';
import { ImportDatasetIcon } from './icons/ImportDatasetIcon';
import { Kafka } from './icons/Kafka';
import { MySQL } from './icons/MySQL';
import { Oracle } from './icons/Oracle';
import { PostGRESSQL } from './icons/PostGRESQL';
import { S3 } from './icons/S3';
import { Spanner } from './icons/Spanner';
import { SQLServer } from './icons/SQLServer';
import { useStyles } from './styles';

const WrangleCard = () => {
  const [state, setState] = useState({
    connectorTypes: [],
  });
  const getConnectorTypesNames = async () => {
    let connectorTypes = await fetchConnectors();
    console.log(connectorTypes);
    connectorTypes = connectorTypes.map((connectorType) => {
      if (connectorType.name === 'S3') {
        return {
          ...connectorType,
          SVG: S3,
        };
      } else if (connectorType.name === 'Database') {
        return {
          ...connectorType,
          SVG: Database,
        };
      } else if (connectorType.name === 'BigQuery') {
        return {
          ...connectorType,
          SVG: Bigquery,
        };
      } else if (connectorType.name === 'GCS') {
        return {
          ...connectorType,
          SVG: GCS,
        };
      } else if (connectorType.name === 'Spanner') {
        return {
          ...connectorType,
          SVG: Spanner,
        };
      } else if (connectorType.name === 'Kafka') {
        return {
          ...connectorType,
          SVG: Kafka,
        };
      } else if (connectorType.name === 'SQL Server') {
        return {
          ...connectorType,
          SVG: SQLServer,
        };
      } else if (connectorType.name === 'MySQL') {
        return {
          ...connectorType,
          SVG: MySQL,
        };
      } else if (connectorType.name === 'Oracle') {
        return {
          ...connectorType,
          SVG: Oracle,
        };
      } else if (connectorType.name === 'PostgreSQL') {
        return {
          ...connectorType,
          SVG: PostGRESSQL,
        };
      } else if (connectorType.name === 'File') {
        return {
          ...connectorType,
          SVG: ImportDatasetIcon,
        };
      } else if (connectorType.name === 'CloudSQLMySQL') {
        return {
          ...connectorType,
          SVG: CloudSQLMySQL,
        };
      } else if (connectorType.name === 'CloudSQLPostgreSQL') {
        return {
          ...connectorType,
          SVG: CloudSQLPostGreSQL,
        };
      } else {
        return {
          ...connectorType,
          SVG: Bigquery,
        };
      }
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
    <Box className={classes.wrapper}>
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
