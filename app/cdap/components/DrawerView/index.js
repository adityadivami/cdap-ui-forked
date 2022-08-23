import * as React from 'react';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import DHeader from './DrawerHeader/DHeader';
import DFooter from './DrawerFooter/DFooter';
import DBody from './DrawerBody/DBody';
import { useDrawerCss } from './styles';
import './DrawerView.scss';

export default function DrawerComponent(props) {
  const classes = useDrawerCss();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <Box className={classes.drawerContentWrapper}>
              <div className={classes.flexHeight}>
                <div>
                  <DHeader
                    isHeaderVisible={props.isHeaderVisible || true} // -------isHeaderVisible BOOLEAN to let see header
                    headerTitle={props.headerTitle || 'Add Transformation Step'} // -------headerTitle For title can be optional
                    headerComponent={props.headerComponent} // -------headerComponent can be a function or Variable containing html to render different header view
                    toggleDrawer={toggleDrawer(anchor, false)}
                  />
                  <DBody
                    bodyComponent={props.bodyComponent} // -------bodyComponent can be a function or Variable containing html to render different body view
                  />
                </div>
                <DFooter
                  isFooterVisible={props.isFooterVisible || true} // -------isFooterVisible BOOLEAN to let see footer
                  footerComponent={props.footerComponent} // -------headerComponent can be a function or Variable containing html to render different footer view
                />
              </div>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
