import { Button, Container } from '@material-ui/core';
import DataPrepStore from 'components/DataPrep/store';
import DrawerWidget from 'components/DrawerWidget';
import DirectiveContent from 'components/GridTable/DirectiveComponents';
import { DIRECTIVE_COMPONENTS } from 'components/GridTable/DirectiveComponents/constants';
import React, { Fragment, useState } from 'react';
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
import { parseDirective } from './utils';

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
  });
  console.log('directiveComponentValues', directiveComponentValues);

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
