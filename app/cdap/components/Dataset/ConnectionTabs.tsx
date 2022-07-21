import { styled, Tooltip, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { useStyles } from './styles';
import CustomTooltip from './CustomTooltip';

const ConnectionTab = styled(Tab)({
  minWidth: '161px',
  padding: '15px 0px 15px 32px',
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
  '&:first-child': {
    paddingTop: '30px',
    paddingBottom: '30px',
  },
});

const ConnectionsTabs = ({ connectorTypes, handleChange, value }) => {
  const classes = useStyles();

  return (
    <Box className={classes.boxStyles}>
      <Tabs
        onChange={handleChange}
        value={value}
        orientation="vertical"
        variant="scrollable"
        TabIndicatorProps={{
          className: classes.tabIndicatorStyles,
        }}
      >
        {connectorTypes.map((connectorType, connectorTypeIndex) => (
          <ConnectionTab
            label={<TabLabel label={connectorType.name} count={connectorType.count} />}
            value={connectorType.name}
            icon={<Box className={classes.iconBoxStyles}>{connectorType.SVG}</Box>}
            disableTouchRipple
            key={`${connectorType.name}=${connectorTypeIndex}`}
            id={connectorType.name}
          />
        ))}
      </Tabs>
    </Box>
  );
};

const TabLabel = ({ label, count }: { label: string; count: number }) => {
  const classes = useStyles();

  return (
    <CustomTooltip title={label.length > 16 ? label : ''} arrow>
      <Box className={classes.labelsContainer}>
        <Typography variant="body1" className={classes.labelStyles}>
          {label}
        </Typography>
        <Typography variant="body1" className={classes.labelStyles}>{`(${count})`}</Typography>
      </Box>
    </CustomTooltip>
  );
};

export default ConnectionsTabs;
