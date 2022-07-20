import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { CardContentData } from './CardContent';
import { explorationCardStyles } from './styles';
import { IMockData } from '../mock/types';

interface IOngoingExplorationCardProps {
  itemData: IMockData[];
}
const OngoingExplorationCard: React.FC<IOngoingExplorationCardProps> = ({ itemData }) => {
  const classes = explorationCardStyles();

  return (
    <Card className={classes.explorationCardStyles}>
      <CardContent className={classes.cardContent}>
        {itemData.map((eachItem: IMockData) => {
          return <CardContentData item={eachItem} styles={classes} />;
        })}
      </CardContent>
    </Card>
  );
};
export default OngoingExplorationCard;
