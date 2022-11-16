import { DATATYPE_OPTIONS } from 'components/ColumnInsights/options';
import InputSelect from 'components/ParsingDrawer/Components/InputSelect';
import React, { useState } from 'react';
import { useStyles } from './styles';
import EditIcon from '@material-ui/icons/Edit';
import { Box } from '@material-ui/core';

const ColumnDetails = (props) => {
  const {
    columnName,
    characterCount,
    distinctValues,
    dataTypeString,
    renameColumnNameHandler,
    dataTypeHandler,
    columnType,
  } = props;

  const defaultValueProvided = DATATYPE_OPTIONS.filter(
    (each) => each.value === columnType.toLowerCase()
  );
  const [dataTypeValue, setDataTypeValue] = useState();

  console.log(dataTypeValue, defaultValueProvided);

  const classes = useStyles();
  const [canEdit, setCanEdit] = useState(false);
  const [inputValue, setInputValue] = useState(columnName);

  const handleDataTypeChange = (e) => {
    setDataTypeValue(e.target);
    dataTypeHandler(e.target.value);
  };

  const editHandler = () => {
    setCanEdit(true);
  };

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onBlurEvent = (e) => {
    setInputValue(e.target.value);
    setCanEdit(false);
    if (e.target.value !== columnName) {
      renameColumnNameHandler(columnName, e.target.value);
    }
  };

  return (
    <section className={classes.columnInsightsTopSection}>
      <div className={classes.columnInsightsColumnName}>
        {canEdit ? (
          <input
            value={inputValue}
            onBlur={(e) => onBlurEvent(e)}
            onChange={(e) => onChangeHandler(e)}
          />
        ) : (
          inputValue
        )}
        <Box>
          <EditIcon onClick={editHandler} />
        </Box>
      </div>
      <InputSelect
        classes={{
          icon: classes.selectIconStyles,
          select: classes.selectStyles,
        }}
        className={classes.selectFieldStyles}
        optionClassName={{ root: classes.optionStyles }}
        defaultValue={defaultValueProvided[0].value}
        value={dataTypeValue}
        onChange={(e) => handleDataTypeChange(e)}
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
