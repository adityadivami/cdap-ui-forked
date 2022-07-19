import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { CardContentComponent } from './CardContext';
import { explorationCardStyles } from './styles';

const OngoingExplorationCard = ({ itemData }) => {
  const cardData = itemData;
  const classes = explorationCardStyles();

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
