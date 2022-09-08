import DrawerWidget from 'components/DrawerWidget';
import React, { useEffect, useState } from 'react';
import ColumnDataDistribution from './Components/ColumnDataDistribution';
import ColumnDataQuality from './Components/ColumnDataQuality';
import ColumnDetails from './Components/ColumnDetails';
import { COLUMN_INSIGHTS } from './constants';

const ColumnInsights = (props) => {
  const { columnData } = props;
  const [drawerStatus, setDrawerStatus] = useState(true);
  const [columnDetail, setColumnDetail] = useState(columnData);

  useEffect(() => {
    setColumnDetail(columnData);
  }, [columnData]);

  const closeClickHandler = () => {
    setDrawerStatus(false);
    props.onClose();
  };

  return (
    <DrawerWidget
      headingText={COLUMN_INSIGHTS}
      openDrawer={setDrawerStatus}
      anchor="left"
      headerActionTemplate={undefined}
      closeClickHandler={closeClickHandler}
    >
      <ColumnDetails
        columnName={columnDetail?.columnName}
        distinctValues={columnDetail?.distinctValues}
        characterCount={`${columnDetail?.characterCount?.min}-${columnDetail?.characterCount?.max}`}
        dataTypeString={columnDetail?.dataTypeString || 'Contains Letter'}
      />
      <ColumnDataQuality dataQuality={columnDetail?.dataQuality} />
      <ColumnDataDistribution />
    </DrawerWidget>
  );
};

export default ColumnInsights;
