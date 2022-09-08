import DrawerWidget from 'components/DrawerWidget';
import React, { useState } from 'react';
import ColumnDataDistribution from './Components/ColumnDataDistribution';
import ColumnDataQuality from './Components/ColumnDataQuality';
import ColumnDetails from './Components/ColumnDetails';
import { COLUMN_INSIGHTS } from './constants';

const ColumnInsights = () => {
  const [drawerStatus, setDrawerStatus] = useState(true);

  const closeClickHandler = () => {
    setDrawerStatus(false);
  };

  return (
    <DrawerWidget
      headingText={COLUMN_INSIGHTS}
      openDrawer={setDrawerStatus}
      anchor="left"
      headerActionTemplate={undefined}
      closeClickHandler={closeClickHandler}
    >
      <ColumnDetails columnName="Region" distinctValues="48" characterCount="4-8" />
      <ColumnDataQuality />
      <ColumnDataDistribution />
    </DrawerWidget>
  );
};

export default ColumnInsights;
