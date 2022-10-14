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
  } = props;

  const [dataTypeValue, setDataTypeValue] = useState();

  const classes = useStyles();
  const [canEdit, setCanEdit] = useState(false);
  const [inputValue, setInputValue] = useState(columnName);

  const handleDataTypeChange = (e) => {
    setDataTypeValue(e.target.value);
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
        defaultValue={DATATYPE_OPTIONS[0].value}
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
