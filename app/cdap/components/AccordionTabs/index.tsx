import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { getCategorizedConnections } from 'components/Connections/Browser/SidePanel/apiHelpers';
import { fetchConnectors } from 'components/Connections/Create/reducer';
import * as React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles({
  acordionContainer: {
    maxWidth: '252px',
    alignItems: 'centre',
  },
});

const AccordionTabsCaller: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = React.useState<any>({
    categorizedConnections: new Map(),
    connectorTypes: [],
  });

  React.useEffect(() => {
    getConnectionsTabData();
  });

  const getConnectionsTabData = async () => {
    const connectorTypes = await fetchConnectors();
    const categorizedConnections = await getCategorizedConnections();

    setState({
      categorizedConnections,
      connectorTypes,
    });
  };

  return (
    <Box className={classes.acordionContainer}>
      {state.connectorTypes.map((connectorType, index) => {
        const key = connectorType.name;
        const connections = state.categorizedConnections.get(key);
        return (
          <Accordion>
            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
              <Typography>{connectorType.name}</Typography>
            </AccordionSummary>

            {connections !== undefined ? (
              connections.map((connection) => {
                <AccordionDetails>{connection.name}</AccordionDetails>;
              })
            ) : (
              <div>undefined</div>
            )}
          </Accordion>
        );
      })}
    </Box>
  );
};
export default AccordionTabsCaller;
