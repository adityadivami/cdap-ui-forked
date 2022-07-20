import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import GCSIcon from 'components/Dataset/SVGs/GCSIcon';
import LinearProgressBar from '../LinearProgressBar';
import { ICardContentDataProps } from '../mock/types';

export const CardContentData: React.FC<ICardContentDataProps> = ({ item, styles }) => {
  switch (item.type) {
    case 'label':
      return (
        <Typography component="div" variant="body1" className={styles.datasetName}>
          {item.label}
        </Typography>
      );
    case 'subLabel':
      return (
        <Typography component="div" variant="body2" className={styles.datasetDetails}>
          {item.label}&nbsp;
          {item.subText}
        </Typography>
      );

    case 'progressValue':
      return (
        <Box component="div" className={styles.linearProgressBarContainer}>
          <LinearProgressBar variant="determinate" value={item.value} />
        </Box>
      );
    case 'connectionName':
      return (
        <Box className={styles.cardFooter}>
          <GCSIcon />
          <Typography component="div" variant="body2" className={styles.datasetDetails}>
            {item.label}
          </Typography>
        </Box>
      );
  }
};
