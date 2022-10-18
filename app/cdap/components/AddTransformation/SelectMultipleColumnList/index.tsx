import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useStyles } from '../styles';
import { SearchIcon } from '../iconStore';
import { prepareDataQualtiy } from '../CircularProgressBar/utils';
import DataQualityProgress from '../CircularProgressBar';
import { NoDataSVG } from 'components/GridTable/iconStore';
import { multipleColumnSelected } from '../constants';
import T from 'i18n-react';

const SelectColumnsList = (props) => {
  const {
    directiveFunctionSupportedDataType,
    selectedColumnsCount,
    columnData,
    setSelectedColumns,
    dataQuality,
    functionName,
  } = props;
  const [columns, setColumns] = useState(columnData);
  const [dataQualityValue, setDataQualityValue] = useState(dataQuality);
  const [selectedColumns, setSelectedColumn] = useState([]);
  const [focused, setFocused] = useState(false);
  const classes = useStyles();
  const ref = useRef(null);
  const no_match =
    directiveFunctionSupportedDataType.length > 0
      ? !directiveFunctionSupportedDataType.includes('all')
      : false
      ? columns.filter((object1) => {
          return directiveFunctionSupportedDataType.some((object2) => {
            return object2.includes(object1.type[0].toLowerCase());
          });
        })
      : [];
  useEffect(() => {
    const getPreparedDataQuality = prepareDataQualtiy(dataQuality, columnData);
    setDataQualityValue(getPreparedDataQuality);
  }, []);

  const onSelect = (event, column) => {
    if (event.target.checked) {
      setSelectedColumns((prev) => [...prev, column]);
      setSelectedColumn([...selectedColumns, column]);
    } else {
      const indexOfUnchecked = selectedColumns.findIndex((el) => el.label === column.label);
      if (indexOfUnchecked > -1) {
        const clone_columns = [...selectedColumns];
        const remaining_col = clone_columns.splice(indexOfUnchecked, 1);
        setSelectedColumns(clone_columns);
        setSelectedColumn(clone_columns);
      }
    }
  };

  const handleSearch = (event) => {
    if (event.target.value) {
      const columnValue = columnData.filter((el) =>
        el?.label.toLowerCase().includes(event.target.value.toLowerCase())
      );
      if (columnValue.length) {
        setColumns(columnValue);
      } else {
        setColumns([]);
      }
    } else {
      setColumns(columnData);
    }
  };

  const handleFocus = () => {
    ref?.current.focus();
    setFocused(true);
  };

  const handleDisableCheckbox = (column) => {
    const multiSelect = multipleColumnSelected.filter(
      (el) => el.value == functionName && el.isMoreThanTwo
    );
    if (selectedColumns.length === 0 || selectedColumns.length < 2) {
      return false;
    } else if (multiSelect.length) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <section className={classes.columnsCountTextStyles}>
      <div className={classes.selectColumnsHeaderStyles}>
        <div>
          {selectedColumnsCount
            ? selectedColumnsCount > 10
              ? selectedColumnsCount
              : `0${selectedColumnsCount}`
            : 'No '}
          &nbsp;{T.translate('features.WranglerNewAddTransformation.columnsSelected')}
        </div>
        <div className={classes.searchFormControl}>
          <input
            className={focused ? classes.isFocused : classes.isBlurred}
            onChange={handleSearch}
            ref={ref}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <Box className={classes.searchInputAdornment} onClick={handleFocus}>
            {SearchIcon()}
          </Box>
        </div>
      </div>
      {no_match.length === 0 ? (
        <Box className={classes.noRecordWrapper}>
          <Box className={classes.innerWrapper}>
            {NoDataSVG}
            <Typography className={classes.mainHeaderMessage}>
              {T.translate('features.WranglerNewSelectCoulmnList.noColumns')}
            </Typography>
            <Typography className={classes.subHeaderMessage}>
              {T.translate('features.WranglerNewSelectCoulmnList.noMatchColumnDatatype')}
            </Typography>
          </Box>
        </Box>
      ) : (
        <TableContainer component={Box}>
          <Table aria-label="recipe steps table">
            <TableHead>
              <TableRow className={`${classes.recipeStepsTableRowStyles} ${classes.rowsOfTable}`}>
                <TableCell classes={{ head: classes.recipeStepsTableHeadStyles }}></TableCell>
                <TableCell classes={{ head: classes.recipeStepsTableHeadStyles }}>
                  {T.translate('features.WranglerNewAddTransformation.columns')}
                </TableCell>
                <TableCell
                  classes={{
                    head: `${classes.recipeStepsTableHeadStyles} ${classes.nullValueHead}`,
                  }}
                >
                  {T.translate('features.WranglerNewAddTransformation.nullValues')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {columns.map((eachColumn, index) => {
                if (directiveFunctionSupportedDataType.includes('all')) {
                  return (
                    <TableRow
                      className={`${classes.recipeStepsTableRowStyles} ${classes.rowsOfTable}`}
                      key={index}
                    >
                      <TableCell
                        classes={{
                          body: `${classes.recipeStepsTableRowStyles} ${classes.radioButtonCellStyles}`,
                        }}
                      >
                        <FormControlLabel
                          disabled={
                            selectedColumns.filter((el) => el.label === eachColumn.label).length ||
                            !handleDisableCheckbox(eachColumn)
                              ? false
                              : true
                          }
                          control={
                            <Checkbox
                              color="primary"
                              checked={
                                selectedColumns.filter((el) => el.label === eachColumn.label).length
                                  ? true
                                  : false
                              }
                              onChange={(e) => onSelect(e, eachColumn)}
                            />
                          }
                          label=""
                        />
                      </TableCell>
                      <TableCell classes={{ body: classes.recipeStepsTableRowStyles }}>
                        <Typography className={classes.recipeStepsActionTypeStyles}>
                          {eachColumn.label}
                        </Typography>
                        <Typography className={classes.recipeStepsActionTypeStyles}>
                          {eachColumn.type}
                        </Typography>
                      </TableCell>
                      <TableCell
                        className={[
                          classes.recipeStepsTableRowStyles,
                          classes.circularBarCell,
                        ].join(' ')}
                      >
                        {dataQualityValue?.length && (
                          <DataQualityProgress value={dataQualityValue[index]?.value} />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                } else if (
                  directiveFunctionSupportedDataType.includes(eachColumn?.type[0]?.toLowerCase())
                ) {
                  return (
                    <TableRow
                      className={`${classes.recipeStepsTableRowStyles} ${classes.rowsOfTable}`}
                      key={index}
                    >
                      <TableCell
                        classes={{
                          body: `${classes.recipeStepsTableRowStyles} ${classes.radioButtonCellStyles}`,
                        }}
                      >
                        <FormControlLabel
                          disabled={
                            selectedColumns.filter((el) => el.label === eachColumn.label).length ||
                            !handleDisableCheckbox(eachColumn)
                              ? false
                              : true
                          }
                          control={
                            <Checkbox
                              color="primary"
                              checked={
                                selectedColumns.filter((el) => el.label === eachColumn.label).length
                                  ? true
                                  : false
                              }
                              onChange={(e) => onSelect(e, eachColumn)}
                            />
                          }
                          label=""
                        />
                      </TableCell>
                      <TableCell classes={{ body: classes.recipeStepsTableRowStyles }}>
                        <Typography className={classes.recipeStepsActionTypeStyles}>
                          {eachColumn.label}
                        </Typography>
                        <Typography className={classes.recipeStepsActionTypeStyles}>
                          {eachColumn.type}
                        </Typography>
                      </TableCell>
                      <TableCell
                        // className={[classes.recipeStepsTableRowStyles, classes.displayNone].join(' ')}
                        className={[
                          classes.recipeStepsTableRowStyles,
                          classes.circularBarCell,
                        ].join(' ')}
                      >
                        {dataQualityValue?.length && (
                          <DataQualityProgress value={dataQualityValue[index]?.value} />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </section>
  );
};

export default SelectColumnsList;
