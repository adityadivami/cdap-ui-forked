import { styled, Tooltip, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { useStyles } from './styles';
import CustomTooltip from './CustomTooltip';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import white from '@material-ui/core/colors/common';
import grey from '@material-ui/core/colors/grey';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const ConnectionTab = styled(Tab)({
  minWidth: '161px',
  padding: '15px 0px 15px 30px',
  textTransform: 'none',
  color: 'black',
  fontSize: '16px',
  minHeight: '53px !important',
  '& .MuiTab-labelIcon': { minHeight: '54px !important' },
  '& .MuiTab-wrapper': {
    fontSize: '16px',
    fontWeight: '400',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '9.41px',
    flexDirection: 'row',
    zIndex: 3,
    whiteSpace: 'nowrap',
  },
  '&.MuiTab-root': {
    width: '252px',
  },
  '&.MuiTab-labelIcon .MuiTab-wrapper > *:first-child': {
    marginBottom: '0px',
  },
  '&:hover': {
    backgroundColor: '#4681F4',
    color: 'white',
  },
  '&$selected': {
    backgroundColor: '#004C9B',
    color: 'white',
  },
});

const ConnectionsTabs = ({ tabsData, handleChange, value, index }) => {
  const classes = useStyles();
  return (
    <>
      {tabsData.showTabs && (
        <Box className={classes.boxStyles}>
          <Tabs
            value={value}
            orientation="vertical"
            variant="scrollable"
            textColor="primary"
            TabIndicatorProps={{
              className: classes.tabIndicatorStyles,
            }}
          >
            {tabsData.data.map((connectorType, connectorTypeIndex) => (
              <ConnectionTab
                onClick={() => {
                  handleChange(connectorType, index);
                }}
                label={
                  index > 1 ? (
                    connectorType.canBrowse ? (
                      <TabLabelCanBrowse
                        label={connectorType.name}
                        count={index === 0 ? connectorType.count : undefined}
                        index={index}
                      />
                    ) : (
                      <TabLabelCanSample label={connectorType.name} />
                    )
                  ) : (
                    <TabLabelCanBrowse
                      label={connectorType.name}
                      count={index === 0 ? connectorType.count : undefined}
                      index={index}
                    />
                  )
                }
                value={connectorType.name}
                // icon={<Box className={classes.iconBoxStyles}>{connectorType.SVG}</Box>}
                disableTouchRipple
                key={`${connectorType.name}=${connectorTypeIndex}`}
                id={connectorType.name}
              />
            ))}
          </Tabs>
        </Box>
      )}
    </>
  );
};

const TabLabelCanBrowse = ({
  label,
  count,
  index,
}: {
  label: string;
  count: number;
  index: number;
}) => {
  const classes = useStyles();

  return (
    <CustomTooltip title={label.length > 16 ? label : ''} arrow>
      <Box className={classes.tabsContainer}>
        <Box className={classes.labelsContainer}>
          <Typography variant="body1" className={classes.labelStyles}>
            {label}
          </Typography>
          {count && (
            <Typography variant="body1" className={classes.labelStyles}>{`(${count})`}</Typography>
          )}
        </Box>
        <Box>
          <ArrowForwardIosIcon style={{ color: 'white' }} />
        </Box>
      </Box>
    </CustomTooltip>
  );
};

const TabLabelCanSample = ({ label }: { label: string }) => {
  const classes = useStyles();

  return (
    <CustomTooltip title={label.length > 16 ? label : ''} arrow>
      <Box className={classes.labelsContainerCanSample}>
        <Typography variant="body1" className={classes.labelStylesCanSample}>
          {label}
        </Typography>
        <Typography> Wrangle </Typography>
      </Box>
    </CustomTooltip>
  );
};

export default ConnectionsTabs;
