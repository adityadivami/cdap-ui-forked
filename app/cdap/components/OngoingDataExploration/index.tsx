import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core/';
import ExplorationCardStyles from './styles';
import { mockData } from './data';

const OngoingDataExploration = () => {
  const classes = ExplorationCardStyles();

  return (
    <Box className={classes.wrapperForGrid}>
      {mockData.map((item) => {
        return (
          <Grid container className={classes.gridContainer}>
            {item.map((eachItem) => {
              switch (eachItem.type) {
                case 'iconWithText':
                  return (
                    <Grid item className={classes.elementStyle}>
                      <Box className={classes.iconStyle}> {eachItem.icon}</Box>

                      <Typography variant="body1">{eachItem.label}</Typography>
                    </Grid>
                  );
                case 'text':
                  return (
                    <Grid item className={classes.elementStyle}>
                      <Typography variant="body1"> {eachItem.label}</Typography>
                    </Grid>
                  );
                case 'percentageWithText':
                  const percent = parseInt(eachItem.label);
                  const customClassEvaluator = true;
                  return (
                    <Grid item className={classes.elementStyle}>
                      <Typography
                        variant="body2"
                        className={
                          percent > 50 ? classes.percentageStyleGreen : classes.percentageStyleRed
                        }
                      >
                        {eachItem.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        className={
                          customClassEvaluator
                            ? classes.percentageSymbolGreen
                            : classes.percentageSymbolRed
                        }
                      >
                        {eachItem.percentageSymbol}
                      </Typography>

                      <Typography variant="body1">{eachItem.subText}</Typography>
                    </Grid>
                  );

                default:
                  break;
              }
            })}
          </Grid>
        );
      })}
    </Box>
  );
};
export default OngoingDataExploration;
