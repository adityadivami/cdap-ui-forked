import { DATATYPE_OPTIONS } from 'components/ColumnInsights/options';
import InputSelect from 'components/ParsingDrawer/Components/InputSelect';
import React, { useState } from 'react';
import { useStyles } from './styles';

const ColumnDetails = (props) => {
  const { columnName, characterCount, distinctValues, dataTypeString } = props;

  const [dataTypeValue, setDataTypeValue] = useState();

  const classes = useStyles();

  const handleDataTypeChange = () => {};

  return (
    <section className={classes.columnInsightsTopSection}>
      <div className={classes.columnInsightsColumnName}>{columnName}</div>
      <InputSelect
        classes={{
          icon: classes.selectIconStyles,
          select: classes.selectStyles,
        }}
        className={classes.selectFieldStyles}
        optionClassName={{ root: classes.optionStyles }}
        defaultValue={DATATYPE_OPTIONS[0].value}
        value={dataTypeValue}
        onChange={handleDataTypeChange}
        options={DATATYPE_OPTIONS}
      />
      <section className={classes.columnInsightsDetailsWrapper}>
        <div className={classes.columnInsightsDetailsCountSection}>
          <div className={classes.columnInsightsDetailsCount}>Character count {characterCount}</div>
          <div className={classes.dividerLineStyles} />
          <div className={classes.columnInsightsDetailsCount}>Distinct {distinctValues}</div>
        </div>
        <div className={classes.columnInsightsDetailsCountDescription}>{dataTypeString}</div>
      </section>
    </section>
  );
};

export default ColumnDetails;
