import { Box } from '@material-ui/core';
import ColumnViewWidget from 'components/ColumnViewWidget';
import React, { Fragment, useState } from 'react';
import { HEADING_TEXT } from './constants';
import SelectColumnsList from './SelectColumnsList';
import { useStyles } from './styles';

const ColumnView = (props) => {
  const { columnData, closeClickHandler, dataQuality } = props;
  const [searchValue, setSearchValue] = useState('');

  const classes = useStyles();

  const searchedTermHandler = (searchedTerm) => {
    setSearchValue(searchedTerm);
  };

  return (
    <Fragment>
      <ColumnViewWidget
        headingText={HEADING_TEXT}
        closeClickHandler={closeClickHandler}
        columnData={columnData}
        searchedTermHandler={searchedTermHandler}
      >
        <Box className={classes.addTransformationBodyStyles}>
          <SelectColumnsList
            columnData={columnData}
            dataQuality={dataQuality}
            searchTerm={searchValue}
          />
        </Box>
      </ColumnViewWidget>
    </Fragment>
  );
};

export default ColumnView;
