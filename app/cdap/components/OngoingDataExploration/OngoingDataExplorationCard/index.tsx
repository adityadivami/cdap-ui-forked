import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import GCSIcon from 'components/Dataset/SVGs/GCSIcon';
import LinearProgressComponent from '../LinearProgressBar';
import { mockData } from '../mock';
import { CardContentComponent } from './CardContext';
const useStyles = makeStyles({
  explorationCardStyles: {
    minHeight: '209px',
    minWidth: '279px',
    background: 'linear-gradient(180deg, rgba(75, 175, 79, 0.08) 0%, rgba(75, 175, 79, 0) 50%)',
    boxShadow: 'none',
    border: '1px solid #DADCE0',
    borderRadius: '4px',
    padding: '28px 25px 16px 25px',
  },
  datasetName: {
    lineHeight: '24px',
    fontSize: '16px',
  },
  datasetDetails: {
    color: 'rgba(95, 99, 104, 1)',
    lineHeight: '24px',
    fontSize: '16px',
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

const OngoingExplorationCard = ({ itemData }) => {
  const cardData = itemData;

  const classes = useStyles();
  return (
    <>
      <Card className={classes.explorationCardStyles}>
        <CardContent className={classes.cardContent}>
          {cardData.map((eachItem) => {
            return <CardContentComponent item={eachItem} styles={classes} />;
          })}
        </CardContent>
      </Card>
    </>
  );
};
export default OngoingExplorationCard;
