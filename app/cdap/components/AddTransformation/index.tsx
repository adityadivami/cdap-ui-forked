import { Button, Container } from '@material-ui/core';
import DrawerWidget from 'components/DrawerWidget';
import React, { Fragment, useEffect, useState } from 'react';
import ActionsWidget from './ActionsWidget';
import {
  ADD_TRANSFORMATION_STEP,
  APPLY_STEP,
  SELECT_COLUMNS_TO_APPLY_THIS_FUNCTION,
  DONE_STEP,
} from './constants';
import FunctionNameWidget from './FunctionNameWidget';
import SelectColumnsList from './SelectColumnsList';
import SelectColumnsWidget from './SelectColumnsWidget';
import SelectedColumnCountWidget from './SelectedColumnCountWidget';
import DataPrepStore from 'components/DataPrep/store';
import { useStyles } from './styles';
import MyDataPrepApi from 'api/dataprep';
import { useParams } from 'react-router';
import DirectiveContent from 'components/GridTable/DirectiveComponents';
import { DIRECTIVE_COMPONENTS } from 'components/GridTable/DirectiveComponents/constants';
import {
  parseDirective,
  directiveForHash,
  prepareDirectiveForFilter,
  prepareDirectiveForPattern,
  prepareDirectiveForDefineVariable,
  prepareDirectiveForSendToError,
} from './utils';

const AddTransformation = (props) => {
  const { functionName, columnData, setLoading, missingDataList } = props;
  const params = useParams() as any;

  const [drawerStatus, setDrawerStatus] = useState(true);
  const [columnsPopup, setColumnsPopup] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');
  const [replaceValue, setReplaceValue] = useState('');
  const { dataprep } = DataPrepStore.getState();
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
    counter: '',
    counterName: '',
  });

  useEffect(() => {
    if (selectedColumns.length) {
      setDirectiveComponentsValue({
        ...directiveComponentValues,
        selectedColumn: selectedColumns[0].label,
      });
    }
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
        directiveComponentValues.filterRowToKeepOrRemove,
        directiveComponentValues.filterCondition,
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
        directiveComponentValues.filterCondition === 'true'
          ? `increment-variable ${directiveComponentValues.counterName} ${directiveComponentValues.counter} true`
          : `increment-variable ${directiveComponentValues.counterName} ${directiveComponentValues.counter} ${directiveComponentValues.filterConditionValue}`;
      props.applyTransformation(selectedColumns[0].label, getValue);
    } else if (functionName == 'dateTime' || functionName == 'dateTimeAsString') {
      if (directiveComponentValues.radioOption === 'customFormat') {
        props.applyTransformation(selectedColumns[0].label, directiveComponentValues.customInput);
      } else {
        props.applyTransformation(selectedColumns[0].label, directiveComponentValues.radioOption);
      }
    } else if (functionName === 'fillNullOrEmpty') {
      props.applyTransformation(selectedColumns[0].label, directiveComponentValues.customInput);
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

  const isComponentAvailable = DIRECTIVE_COMPONENTS.some((item) => item.type === functionName);

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
              setSelectedColumns={setSelectedColumns}
              handleSelectColumn={handleSelectColumn}
              selectedColumns={selectedColumns}
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
        closeClickHandler={closeSelectColumnsPopup}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            <SelectColumnsList
              columnData={columnData}
              selectedColumnsCount={selectedColumns.length}
              setSelectedColumns={setSelectedColumns}
              dataQuality={missingDataList}
            />
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
