import { Box, Typography } from '@material-ui/core';
import React from 'react';
import T from 'i18n-react';
import { useStyles } from 'components/FooterPanel/Components/RecipeStepsTab/styles';

const PREFIX = 'features.FooterPanel.labels';

export default function({ recipeStepsCount }) {
  const classes = useStyles();

  return (
    <Box className={classes.recipeContainer}>
      <Typography
        data-testid="footerpanel-labels-recipesteps"
        id="footerpanel-labels-recipesteps"
        component="span"
      >
        {`${T.translate(`${PREFIX}.recipeSteps`)}`}
      </Typography>
      <Typography
        className={classes.recipeStepsCount}
        id="footerpanel-labels-recipeStepsCount"
        data-testid="footerpanel-labels-recipeStepsCount"
        component="span"
      >
        {recipeStepsCount}
      </Typography>
    </Box>
  );
}
