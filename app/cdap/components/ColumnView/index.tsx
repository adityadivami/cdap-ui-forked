import { Box, Container } from '@material-ui/core';
import ColumnViewWidget from 'components/ColumnViewWidget';
import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router';
import { HEADING_TEXT, NULL_VALUES } from './constants';
import SelectColumnsList from './SelectColumnsList';
import { useStyles } from './styles';

const ColumnView = (props) => {
  const { columnData, closeClickHandler } = props;
  const params = useParams() as any;
  const [columnsPopup, setColumnsPopup] = useState(true);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const classes = useStyles();

  return (
    <Fragment>
      <ColumnViewWidget
        headingText={HEADING_TEXT}
        openDrawer={columnsPopup}
        closeClickHandler={closeClickHandler}
      >
        <Box className={classes.addTransformationBodyStyles}>
          <SelectColumnsList columnData={columnData} setSelectedColumns={setSelectedColumns} />
        </Box>
      </ColumnViewWidget>
    </Fragment>
  );
};

export default ColumnView;
