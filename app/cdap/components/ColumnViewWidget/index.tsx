import { Box } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import React, { Fragment } from 'react';
import DrawerWidgetHeading from './DrawerWidgetHeading';
import { useStyles } from './styles';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const ColumnViewWidget = (props) => {
  const classes = useStyles();
  const {
    headingText,
    openDrawer,
    showDivider,
    headerActionTemplate,
    children,
    closeClickHandler,
    showBackIcon,
  } = props;

  return (
    <Box className={classes.drawerContainerStyles} role="presentation">
      <header className={classes.headerStyles}>
        <div className={classes.headerTextWithBackIconStyles}>
          <DrawerWidgetHeading headingText={headingText} />
        </div>
        <Box className={classes.headerRightStyles}>
          <Box className={classes.searchIconContainer}>
            <SearchOutlinedIcon />
          </Box>
          <div className={classes.dividerLineStyles} />
          <CloseRoundedIcon
            className={classes.pointerStyles}
            color="action"
            fontSize="large"
            onClick={closeClickHandler}
          />
        </Box>
      </header>
      <Fragment>{children}</Fragment>
    </Box>
  );
};

export default ColumnViewWidget;
