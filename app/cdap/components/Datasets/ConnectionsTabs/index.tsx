import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useState } from 'react';
import { styled } from '@material-ui/core';
import { Oracle } from '../assets/Oracle';

const StyledTab = styled(Tab)({
  minWidth: '161px',

  height: '10px',
  padding: '8px 10px 10px 10px',
  textTransform: 'none',
  color: 'black',
  fontSize: '13px',
  minHeight: '39px',

  '& .MuiTab-wrapper': {
    display: 'block',
    fontSize: '16px',
    fontWeight: '400',
  },
  '& .PrivateTabIndicator-root-35': {
    bottom: '9px',
  },
  '& .MuiTab-iconWrapper': {
    paddingRight: '5px',
  },
});

const ConnectionsTabs = ({ connectorTypes, categorizedConnections, handleChange, value }) => {
  return (
    <Box>
      <Tabs
        onChange={handleChange}
        value={value}
        variant="scrollable"
        TabIndicatorProps={{ style: { background: '#4681F4', height: '3px' } }}
      >
        {connectorTypes.map((connectorType, index) => {
          const key = connectorType.name;
          const connections = categorizedConnections.get(key) || [];

          const label = `${key}(${connections.length})`; // const label = `${item.connectionName}(${item.count})`; // index to be replaced with lenth
          return <StyledTab icon={<Oracle />} label={label} value={key} />;
        })}
      </Tabs>
    </Box>
  );
};
export default ConnectionsTabs;
