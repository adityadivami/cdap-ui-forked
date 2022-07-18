import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import GCSIcon from 'components/Dataset/SVGs/GCSIcon';
// import LinearProgress from '@material-ui/core/LinearProgress';
import LinearProgressComponent from '../LinearProgressBar';
const useStyles = makeStyles({
  explorationCardStyles: {
    minHeight: '209px',
    height: '209px',
    width: '279px', // ask about this
    background: 'linear-gradient(180deg, rgba(75, 175, 79, 0.08) 0%, rgba(75, 175, 79, 0) 50%)',
    boxShadow: 'none',
    border: '1px solid #DADCE0',
    borderRadius: '4px',
    padding: '28px 25px 19px 25px',
  },
  datasetName: {
    lineHeight: '24px',
    fontSize: '16px',
  },
  datasetDetails: {
    color: 'rgba(95, 99, 104, 1)',
    lineHeight: '25px',
  },
  cardContent: {
    padding: '0px',
  },
  cardFooter: {
    display: 'flex',
    gap: '10px',
  },
  linearProgressBarContainer: {
    padding: '12px 5px 36px 5px',
  },
});

const OngoingExplorationCard = ({ ongoingExplorationData }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.explorationCardStyles}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.datasetName}>
            {ongoingExplorationData.datasetName}
          </Typography>
          <Typography className={classes.datasetDetails}>
            {ongoingExplorationData.recipeSteps} Recipe steps
          </Typography>
          <Typography className={classes.datasetDetails}>
            {ongoingExplorationData.dataQuality}% Data quality
          </Typography>

          <Box className={classes.linearProgressBarContainer}>
            <LinearProgressComponent progressValue={ongoingExplorationData.progressValue} />
          </Box>
          <Box className={classes.cardFooter}>
            <GCSIcon />
            <Typography className={classes.datasetDetails}>
              {ongoingExplorationData.connectionName}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
export default OngoingExplorationCard;
