import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from 'components/FooterPanel/Components/DirectivesTab/styles';
import T from 'i18n-react';

const PREFIX = 'features.FooterPanel.labels';

export default function() {
  const classes = useStyles();

  return (
    <Box className={classes.directivesContainer}>
      <Typography
        data-testid="footerpanel-labels-directives"
        id="footerpanel-labels-directives"
        component="span"
      >
        {`${T.translate(`${PREFIX}.directives`)}`}
      </Typography>
    </Box>
  );
}
