import { Box } from '@material-ui/core';
import CustomTooltip from 'components/ConnectionList/Components/CustomTooltip';
import { useStyles } from 'components/FooterPanel/Components/ColumnViewPanelTab/styles';
import { ColumnIcon } from 'components/FooterPanel/IconStore/ColumnIcon';
import { PREFIX } from 'components/GridTable/constants';
import T from 'i18n-react';
import React from 'react';

export default function({ columnViewPanelOpened, setOpenColumnViewHandler }) {
  const classes = useStyles();

  return (
    <Box>
      <CustomTooltip title={`${T.translate(`${PREFIX}.columnViewPanel`)}`}>
        <Box
          className={`${classes.imgContainer} ${
            columnViewPanelOpened ? classes.showDepth : classes.showNormalView
          }`}
          data-testid="footer-panel-column-icon-container"
          id="footer-panel-column-icon-container"
          onClick={setOpenColumnViewHandler}
        >
          {ColumnIcon}
        </Box>
      </CustomTooltip>
    </Box>
  );
}
