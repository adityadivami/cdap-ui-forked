import { Button, Container } from '@material-ui/core';
import DataPrepStore from 'components/DataPrep/store';
import DrawerWidget from 'components/DrawerWidget';
import DirectiveContent from 'components/GridTable/DirectiveComponents';
import { DIRECTIVE_COMPONENTS } from 'components/GridTable/DirectiveComponents/constants';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ActionsWidget from './ActionsWidget';
import {
  ADD_TRANSFORMATION_STEP,
  APPLY_STEP,
  DONE_STEP,
  SELECT_COLUMNS_TO_APPLY_THIS_FUNCTION,
} from './constants';
import FunctionNameWidget from './FunctionNameWidget';
import SelectColumnsList from './SelectColumnsList';
import SelectColumnsWidget from './SelectColumnsWidget';
import SelectedColumnCountWidget from './SelectedColumnCountWidget';
import { useStyles } from './styles';
import {
  parseDirective,
  directiveForHash,
  prepareDirectiveForFilter,
  prepareDirectiveForPattern,
  prepareDirectiveForDefineVariable,
  prepareDirectiveForSendToError,
  prepareDirectiveForCalculate,
  prepareDirectiveForMerge,
  prepareDirectiveForMultipleDelete,
  prepareDirectiveForMultipleKeep,
} from './utils';
import {
  CALCULATE_OPTIONS,
  DATATYPE_OPTIONS,
} from 'components/GridTable/components/NestedMenu/constants';
import SelectMultipleColumnsList from './SelectMultipleColumnList';
import { multipleColumnSelected } from './constants';

const AddTransformation = (props) => {
  const {
    directiveFunctionSupportedDataType,
    functionName,
    columnData,
    setLoading,
    missingDataList,
  } = props;
  const [drawerStatus, setDrawerStatus] = useState(true);
  const [columnsPopup, setColumnsPopup] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');
  const [replaceValue, setReplaceValue] = useState('');
  const [directiveComponentValues, setDirectiveComponentsValue] = useState({
    radioOption: '',
    ignoreCase: false,
    exactMatch: false,
    filterRowToKeepOrRemove: '',
    filterCondition: '',
    filterConditionValue: '',
    findPreviousValue: '',
    findReplaceValue: '',
    copyColumnName: '',
    customInput: '',
    sheetValue: '',
    firstRowAsHeader: false,
    depth: 1,
    columnWidths: '',
    optionPaddingParam: '',
    hashValue: '',
    encode: false,
    copyToNewColumn: false,
    patternName: '',
    startValue: '',
    endValue: '',
    nDigit: '',
    variableName: '',
    columnNames: columnData.map(({ label }) => label),
    selectedColumnForDefineVariable: '',
    selectedColumn: '',
    counter: 1,
    counterName: '',
    column_1: '',
    column_2: '',
  });

  useEffect(() => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      selectedColumn: selectedColumns.length > 0 ? selectedColumns[0].label : '',
      column_1: selectedColumns.length > 0 ? selectedColumns[0].label : '',
      column_2: selectedColumns.length === 2 ? selectedColumns[1].label : '',
    });
  }, [selectedColumns]);

  const classes = useStyles();

  const closeClickHandler = () => {
    props.callBack();
  };

  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    if (functionName == 'parseCSV') {
      const getDirective = parseDirective(
        functionName,
        selectedColumns[0].label,
        directiveComponentValues.radioOption,
        directiveComponentValues.customInput,
        directiveComponentValues.firstRowAsHeader
      );
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName == 'parseExcel') {
      const getDirective = parseDirective(
        functionName,
        selectedColumns[0].label,
        directiveComponentValues.radioOption,
        directiveComponentValues.sheetValue,
        directiveComponentValues.firstRowAsHeader
      );
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName == 'parseJSON') {
      const getDirective = parseDirective(
        functionName,
        selectedColumns[0].label,
        directiveComponentValues.radioOption,
        directiveComponentValues.depth,
        directiveComponentValues.firstRowAsHeader
      );
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName == 'parseXML') {
      const getDirective = parseDirective(
        functionName,
        selectedColumns[0].label,
        directiveComponentValues.radioOption,
        directiveComponentValues.depth,
        directiveComponentValues.firstRowAsHeader
      );
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName == 'parseLog') {
      const getDirective = parseDirective(
        functionName,
        selectedColumns[0].label,
        directiveComponentValues.radioOption,
        directiveComponentValues.customInput,
        directiveComponentValues.firstRowAsHeader
      );
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName == 'parseSimpleDate') {
      const getDirective = parseDirective(
        functionName,
        selectedColumns[0].label,
        directiveComponentValues.radioOption,
        directiveComponentValues.customInput,
        directiveComponentValues.firstRowAsHeader
      );
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName == 'parseDateTime') {
      const getDirective = parseDirective(
        functionName,
        selectedColumns[0].label,
        directiveComponentValues.radioOption,
        directiveComponentValues.customInput,
        directiveComponentValues.firstRowAsHeader
      );
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName == 'parseFixedLength') {
      const getDirective = parseDirective(
        functionName,
        selectedColumns[0].label,
        directiveComponentValues.radioOption,
        directiveComponentValues.customInput,
        directiveComponentValues.firstRowAsHeader,
        directiveComponentValues.columnWidths,
        directiveComponentValues.optionPaddingParam
      );
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName == 'copyColumn') {
      props.applyTransformation(selectedColumns[0].label, directiveComponentValues.copyColumnName);
    } else if (functionName == 'customTransform') {
      props.applyTransformation(selectedColumns[0].label, directiveComponentValues.customInput);
    } else if (functionName === 'concatenate') {
      if (directiveComponentValues.copyToNewColumn) {
        const value =
          directiveComponentValues.radioOption === 'END'
            ? `${selectedColumns[0].label} + '${directiveComponentValues.customInput}'`
            : `'${directiveComponentValues.customInput}' + ${selectedColumns[0].label}`;
        props.applyTransformation(directiveComponentValues.copyColumnName, value);
      } else {
        const value =
          directiveComponentValues.radioOption === 'END'
            ? `${selectedColumns[0].label} + '${directiveComponentValues.customInput}'`
            : `'${directiveComponentValues.customInput}' + ${selectedColumns[0].label}`;
        props.applyTransformation(selectedColumns[0].label, value);
      }
    } else if (functionName == 'hash') {
      const hashDirective = directiveForHash(
        selectedColumns[0].label,
        directiveComponentValues.hashValue,
        directiveComponentValues.encode
      );
      props.applyTransformation(selectedColumns[0].label, hashDirective);
    } else if (functionName === 'findAndReplace') {
      const makeOldValue = directiveComponentValues.exactMatch
        ? `^${directiveComponentValues.findPreviousValue}$`
        : directiveComponentValues.findPreviousValue;
      const finalValue = directiveComponentValues.ignoreCase
        ? `s/${makeOldValue}/${directiveComponentValues.findReplaceValue}/Ig`
        : `s/${makeOldValue}/${directiveComponentValues.findReplaceValue}/g`;
      props.applyTransformation(selectedColumns[0].label, finalValue);
    } else if (functionName === 'filter') {
      const getDirective = prepareDirectiveForFilter(
        directiveComponentValues.filterRowToKeepOrRemove || 'KEEP',
        directiveComponentValues.filterCondition || 'EMPTY',
        directiveComponentValues.filterConditionValue,
        directiveComponentValues.ignoreCase,
        selectedColumns[0].label
      );
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName === 'delimited-text' || functionName === 'using-delimiters') {
      const getDirective =
        directiveComponentValues.radioOption === 'customDelimiter'
          ? directiveComponentValues.customInput
          : directiveComponentValues.radioOption;
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName === 'using-patterns') {
      const getDirective = prepareDirectiveForPattern(
        selectedColumns[0].label,
        directiveComponentValues.patternName,
        directiveComponentValues.startValue,
        directiveComponentValues.endValue,
        directiveComponentValues.nDigit,
        directiveComponentValues.customInput
      );
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName === 'define-variable') {
      const getDirective = prepareDirectiveForDefineVariable(
        directiveComponentValues.variableName,
        directiveComponentValues.customInput,
        directiveComponentValues.selectedColumnForDefineVariable,
        directiveComponentValues.filterCondition,
        selectedColumns[0].label
      );
      props.applyTransformation(selectedColumns[0].label, getDirective);
    } else if (functionName === 'send-to-error') {
      const getValue = prepareDirectiveForSendToError(
        selectedColumns[0].label,
        directiveComponentValues.customInput,
        directiveComponentValues.ignoreCase,
        directiveComponentValues.filterCondition
      );
      props.applyTransformation(selectedColumns[0].label, getValue);
    } else if (functionName === 'set-counter') {
      const getValue =
        directiveComponentValues.filterConditionValue &&
        directiveComponentValues.filterCondition != 'always'
          ? `increment-variable ${directiveComponentValues.counterName} ${directiveComponentValues.counter} ${directiveComponentValues.filterConditionValue}`
          : `increment-variable ${directiveComponentValues.counterName} ${directiveComponentValues.counter} true`;
      props.applyTransformation(selectedColumns[0].label, getValue);
    } else if (functionName == 'dateTime' || functionName == 'dateTimeAsString') {
      if (directiveComponentValues.radioOption === 'customFormat') {
        props.applyTransformation(selectedColumns[0].label, directiveComponentValues.customInput);
      } else {
        props.applyTransformation(selectedColumns[0].label, directiveComponentValues.radioOption);
      }
    } else if (functionName === 'fillNullOrEmpty' || functionName === 'replace-null-missing') {
      props.applyTransformation(selectedColumns[0].label, directiveComponentValues.customInput);
    } else if (functionName === 'swap-columns') {
      const directive = `swap :${selectedColumns[0].label} :${selectedColumns[1].label}`;
      props.applyTransformation(selectedColumns[0].label, directive);
    } else if (functionName === 'join-columns') {
      const directive = prepareDirectiveForMerge(
        directiveComponentValues.radioOption,
        directiveComponentValues.column_1,
        directiveComponentValues.column_2,
        directiveComponentValues.copyColumnName,
        directiveComponentValues.customInput
      );
      props.applyTransformation(selectedColumns[0].label, directive);
    } else if (CALCULATE_OPTIONS.some((item) => item.value === functionName)) {
      const getValue = prepareDirectiveForCalculate(
        functionName,
        selectedColumns[0].label,
        directiveComponentValues.copyToNewColumn,
        directiveComponentValues.copyColumnName,
        directiveComponentValues.customInput
      );
      props.applyTransformation(selectedColumns[0].label, getValue);
    } else if (functionName == 'rename-column') {
      props.applyTransformation(selectedColumns[0].label, directiveComponentValues.copyColumnName);
    } else if (functionName == 'delete') {
      const getValue = prepareDirectiveForMultipleDelete(selectedColumns);
      props.applyTransformation(selectedColumns[0].label, getValue);
    } else if (functionName == 'keep') {
      const getValue = prepareDirectiveForMultipleKeep(selectedColumns);
      props.applyTransformation(selectedColumns[0].label, getValue);
    } else {
      setLoading(false);
      props.applyTransformation(selectedColumns[0].label);
    }
  };

  const handleSelectColumn = () => {
    setColumnsPopup(true);
  };

  const closeSelectColumnsPopup = () => {
    setColumnsPopup(false);
  };

  const closeSelectColumnsPopupWithoutColumn = () => {
    setColumnsPopup(false);
    setSelectedColumns([]);
  };

  const isComponentAvailable =
    DIRECTIVE_COMPONENTS.some((item) => item.type === functionName) ||
    CALCULATE_OPTIONS.some((item) => item.value === functionName);

  return (
    <Fragment>
      <DrawerWidget
        headingText={ADD_TRANSFORMATION_STEP}
        openDrawer={functionName}
        closeClickHandler={closeClickHandler}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            <SelectedColumnCountWidget selectedColumnsCount={selectedColumns.length} />
            <FunctionNameWidget functionName={functionName} />
            <SelectColumnsWidget
              handleSelectColumn={handleSelectColumn}
              selectedColumns={selectedColumns}
              functionName={functionName}
            />
            {functionName == 'null' ? (
              <ActionsWidget
                functionName={functionName}
                setSelectedAction={setSelectedAction}
                selectedAction={selectedAction}
                setReplaceValue={setReplaceValue}
                replaceValue={replaceValue}
              />
            ) : (
              isComponentAvailable && (
                <DirectiveContent
                  setDirectiveComponentsValue={setDirectiveComponentsValue}
                  directiveComponents={DIRECTIVE_COMPONENTS}
                  directiveComponentValues={directiveComponentValues}
                  functionName={functionName}
                  {...props}
                />
              )
            )}
          </div>
          <Button
            variant="contained"
            disabled={selectedColumns.length ? false : true}
            color="primary"
            classes={{ containedPrimary: classes.buttonStyles }}
            className={classes.applyStepButtonStyles}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleApply(e)}
          >
            {APPLY_STEP}
          </Button>
        </Container>
      </DrawerWidget>
      <DrawerWidget
        headingText={SELECT_COLUMNS_TO_APPLY_THIS_FUNCTION}
        openDrawer={columnsPopup}
        showBackIcon={true}
        closeClickHandler={closeSelectColumnsPopupWithoutColumn}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            {multipleColumnSelected.filter((el) => el.value === functionName).length > 0 ? (
              <SelectMultipleColumnsList
                columnData={columnData}
                selectedColumnsCount={selectedColumns.length}
                setSelectedColumns={setSelectedColumns}
                dataQuality={missingDataList}
                directiveFunctionSupportedDataType={directiveFunctionSupportedDataType}
                functionName={functionName}
              />
            ) : (
              <SelectColumnsList
                columnData={columnData}
                selectedColumnsCount={selectedColumns.length}
                setSelectedColumns={setSelectedColumns}
                dataQuality={missingDataList}
                directiveFunctionSupportedDataType={directiveFunctionSupportedDataType}
              />
            )}
          </div>
          <Button
            variant="contained"
            disabled={selectedColumns.length ? false : true}
            color="primary"
            classes={{ containedPrimary: classes.buttonStyles }}
            className={classes.applyStepButtonStyles}
            onClick={closeSelectColumnsPopup}
          >
            {DONE_STEP}
          </Button>
        </Container>
      </DrawerWidget>
    </Fragment>
  );
};

export default AddTransformation;
