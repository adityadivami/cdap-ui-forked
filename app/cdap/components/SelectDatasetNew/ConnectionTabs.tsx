import { styled, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import CustomTooltip from './CustomTooltip';
import { useStyles } from './styles';
import { CanBrowseIcon, CanBrowseIconHover, WrangelIcon } from './SVGs/wrangleIcon';

const ConnectionTab = styled(Tab)({
  minWidth: '300px',
  padding: '15px 10px 15px 30px',
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
    maxWidth: '300px',
  },
  '&.MuiTab-labelIcon .MuiTab-wrapper > *:first-child': {
    marginBottom: '0px',
  },
  // '&:hover': {
  //   backgroundColor: '#3994FF',
  //   color: '#ffffff',
  //   pointer: 'cursor',
  //   width: '100%',
  //   '&.MuiBox-root-666': {
  //     display: 'none',
  //   },
  // },
  '&.makeStyles-canBrowseIconHover': {
    border: '10px solid green',
  },
});

const ConnectionsTabs = ({ tabsData, handleChange, value, index }) => {
  const classes = useStyles();

  console.log(tabsData, 'child Data');

  // const [refState, setRefState] = React.useState([]);
  // const currentRef = useRef(null);
  // const executeScroll = (index) => {
  //   console.log(refState, 'ref State', currentRef, 'current Ref');
  //   setRefState((prev: any) => {
  //     return [...prev, currentRef];
  //   });
  //   currentRef.current.scrollIntoView();
  // };
  return (
    <>
      {tabsData.showTabs && (
        <div className={classes.boxStyles}>
          <Tabs
            value={value}
            orientation="vertical"
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            TabIndicatorProps={{
              className: classes.tabIndicatorStyles,
            }}
            classes={{
              indicator: classes.indicator,
              root: classes.tabsContainer,
            }}
          >
            {tabsData.data.map((connectorType, connectorTypeIndex) => (
              <ConnectionTab
                onClick={() => {
                  console.log(connectorType, 'check here for aditya');
                  if (index > 1) {
                    connectorType.canBrowse ? handleChange(connectorType, index) : null;
                  } else {
                    handleChange(connectorType, index);
                  }
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
                      SVG={connectorType.SVG}
                    />
                  )
                }
                value={connectorType.name}
                // icon={<Box className={classes.iconBoxStyles}>{connectorType.SVG}</Box>}
                disableTouchRipple
                key={`${connectorType.name}=${connectorTypeIndex}`}
                id={connectorType.name}
                className={connectorType.canSample ? classes.wrangleTab : 'eachConnectionStyle'}
              />
            ))}
          </Tabs>
        </div>
      )}
    </>
  );
};

const TabLabelCanBrowse = ({
  label,
  count,
  index,
  SVG,
}: {
  label: string;
  count: number;
  index: number;
  SVG?: any;
}) => {
  const classes = useStyles();
  console.log(SVG);
  return (
    <CustomTooltip title={label.length > 16 ? label : ''} arrow key={`tooltip-${index}`}>
      <Box className={classes.labelContainerBox}>
        <Box className={classes.labelsContainer}>
          <Box>{SVG}</Box>
          <Typography variant="body1" className={classes.labelStyles}>
            {label}
          </Typography>
          {count && (
            <Typography variant="body1" className={classes.labelStyles}>{`(${count})`}</Typography>
          )}
        </Box>
        <Box>
          <Box className={`canBrowseNormal`}>
            <CanBrowseIcon />
          </Box>
          <Box className={`canBrowseHover`} sx={{ display: 'none' }}>
            <CanBrowseIconHover />
          </Box>
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
        <Box>
          <WrangelIcon />
          <Typography>Wrangle</Typography>
        </Box>
      </Box>
    </CustomTooltip>
  );
};

export default ConnectionsTabs;
