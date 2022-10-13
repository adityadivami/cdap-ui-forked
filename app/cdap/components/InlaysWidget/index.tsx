import { Box, Container, Drawer } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useStyles } from './styles';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import InlayWidgetHeading from './InlayWidgetHeading';

const InlayWidget = (props) => {
  const classes = useStyles();
  const {
    headingText,
    openDrawer,
    showDivider,
    headerActionTemplate,
    children,
    closeClickHandler,
    showBackIcon,
    anchor,
  } = props;

  return (
    <>
      {openDrawer && (
        <Box>
          <Container className={classes.drawerContainerStyles} role="presentation">
            <header className={classes.headerStyles}>
              <div className={classes.headerTextWithBackIconStyles}>
                {showBackIcon && (
                  <img
                    onClick={closeClickHandler}
                    className={classes.headerBackIconStyles}
                    src="/cdap_assets/img/back-icon.svg"
                    alt="Back icon"
                  />
                )}
                <InlayWidgetHeading headingText={headingText} />
              </div>
              <Box className={classes.headerRightStyles}>
                {headerActionTemplate && <div>{headerActionTemplate}</div>}
                {showDivider && <div className={classes.dividerLineStyles} />}
                <CloseRoundedIcon
                  className={classes.pointerStyles}
                  color="action"
                  fontSize="large"
                  onClick={closeClickHandler}
                  data-testid="drawer-widget-close-round-icon"
                />
              </Box>
            </header>
            <Fragment>{children}</Fragment>
          </Container>
        </Box>
      )}
    </>
  );
};

export default InlayWidget;
