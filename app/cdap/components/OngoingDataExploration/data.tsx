import GCSIconOngoingdata from './SVGs/GCSIconOngoingData';
import BigTableIcon from './SVGs/BigTableIcon';
import React from 'react';

export const mockData = [
  [
    {
      icon: <GCSIconOngoingdata />,
      label: 'IndiaSales_DataTable2 Hello this is to check epplises',
      type: 'iconWithText',
    },

    {
      label: 'Connection_Sales_Big ',
      type: 'text',
    },
    {
      label: '14 Recipe steps',
      type: 'text',
    },
    {
      label: '65',
      percentageSymbol: '%',
      subText: 'Data Quality',
      type: 'percentageWithText',
    },
  ],
  [
    {
      icon: <BigTableIcon />,
      label: 'USA_DataTable2',
      type: 'iconWithText',
    },

    {
      label: 'Connection_Sales_Big',
      type: 'text',
    },
    {
      label: '18 Recipe steps',
      type: 'text',
    },
    {
      label: '29',
      percentageSymbol: '%',
      subText: 'Data Quality',
      type: 'percentageWithText',
    },
  ],
];
