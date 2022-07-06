import { getCategorizedConnections } from 'components/Connections/Browser/SidePanel/apiHelpers';
import { fetchConnectors } from 'components/Connections/Create/reducer';
import * as React from 'react';
import { useParams } from 'react-router';

const HomeComponent: React.FC = () => {
  const params = useParams();

  const [selectedConnection, setSelectedConnection] = React.useState(
    (params as any).connectionid || null
  );

  React.useEffect(() => {
    if ((params as any).connectionid !== selectedConnection) {
      setSelectedConnection((params as any).connectionid);
    }
  }, [params]);

  const apis = async () => {
    const categorizedConnections = await getCategorizedConnections();
    const connectorTypes = await fetchConnectors();

    console.log(categorizedConnections, 'getCategorizedConnections');
    console.log(connectorTypes, 'fetchConnectors');
  };

  React.useEffect(() => {
    apis();
  }, []);

  return <>Home Component</>;
};

export default HomeComponent;
