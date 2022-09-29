import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './styles';

const ToggleButton = ({ dataQuality }) => {
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState(0);
  return (
    <Box>
      <Box className={classes.dataQualityCard}>
        <Box
          className={
            isSelected == 1
              ? `${classes.isSelected} ${classes.missingCountBox}`
              : classes.missingCountBox
          }
          onClick={() => setIsSelected(1)}
        >
          <Typography
            className={classes.missingText}
            variant="body1"
          >{`Missing/Null ${dataQuality.missingNullValueCount} (${dataQuality.missingNullValuePercentage}%)`}</Typography>
        </Box>
        <Box
          className={
            isSelected == 2
              ? `${classes.isSelected} ${classes.invalidCountBox}`
              : classes.invalidCountBox
          }
          onClick={() => setIsSelected(2)}
        >
          <Typography
            className={classes.invalidText}
            variant="body1"
          >{`Invalid ${dataQuality.invalidValueCount} (${dataQuality.invalidValuePercentage}%)`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ToggleButton;
