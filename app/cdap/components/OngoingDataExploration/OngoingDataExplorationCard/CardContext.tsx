import { Typography, Box } from '@material-ui/core';
import GCSIcon from 'components/Dataset/SVGs/GCSIcon';
import * as React from 'react';
import LinearProgressComponent from '../LinearProgressBar';

export const CardContentComponent: React.FC<any> = ({ item, styles }) => {
  switch (item.type) {
    case 'label':
      return <Typography className={styles.datasetName}>{item.label}</Typography>;
    case 'subLabel':
      return (
        <Typography className={styles.datasetDetails}>
          {item.label}
          {item.subText}
        </Typography>
      );

    case 'progressValue':
      return (
        <Box className={styles.linearProgressBarContainer}>
          <LinearProgressComponent progressValue={item.value} />
        </Box>
      );
    case 'connectionName':
      return (
        <Box className={styles.cardFooter}>
          <GCSIcon />
          <Typography className={styles.datasetDetails}>{item.label}</Typography>
        </Box>
      );
  }
};
