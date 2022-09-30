import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { useStyles } from './style';
import OngoingDataExploration from 'components/WrangleHome/Components/OngoingDataExploration';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { getCurrentNamespace } from 'services/NamespaceStore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import LoadingSVG from 'components/shared/LoadingSVG';
import { NoDataSVG } from './images';

const WorkspaceList = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [state, setstate] = useState(0);
  const ongoingexp = (value) => {
    setstate(value);
  };
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.header}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          className={classes.breadcrumb}
        >
          <Link color="inherit" to={`/ns/${getCurrentNamespace()}/home`}>
            <Typography className={classes.text}> Home</Typography>
          </Link>
          <Typography className={classes.text}>Workspaces</Typography>
        </Breadcrumbs>
      </Box>

      <Box className={classes.explorationList}>
        <OngoingDataExploration
          dataExploration={ongoingexp}
          fromAddress="workspaceList"
          setLoading={setLoading}
        />
      </Box>
      {loading && (
        <Box className={classes.loadingContainer}>
          <LoadingSVG />
        </Box>
      )}

      {state == 0 && (
        <Box className={classes.noRecordWrapper}>
          <Box className={classes.innerWrapper}>
            {NoDataSVG}
            <Typography className={classes.mainHeaderMessage}>No Records to show</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default WorkspaceList;
