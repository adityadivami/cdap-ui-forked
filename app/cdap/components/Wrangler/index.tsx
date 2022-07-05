import * as React from 'react';
import { Route, Switch } from 'react-router';
import DatasetListComponent from './DatasetList';
import GridComponent from './Grid';
import HomeComponent from './Home';

const WranglerHome: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/wrangler/ns/:namespace/home" render={() => <HomeComponent />} />
        <Route path="/wrangler/ns/:namespace/dataset" render={() => <DatasetListComponent />} />
        <Route path="/wrangler/ns/:namespace/grid" render={() => <GridComponent />} />
      </Switch>
    </>
  );
};

export default WranglerHome;
