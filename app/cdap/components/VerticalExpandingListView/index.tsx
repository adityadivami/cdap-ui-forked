import Box from '@material-ui/core/Box';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    marginTop: '48px',
    display: 'flex',
    height: '100%',
  },
  menuBox: {
    width: '280px',
    border: '1px solid grey',
  },
});
const VerticalExpandingListView = () => {
  const [value, setValue] = useState('All Connections');

  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.menuBox}></Box>

      <Box></Box>
    </Box>
  );
};
export default VerticalExpandingListView;
function fetchEntities(connections: any) {
  throw new Error('Function not implemented.');
}
