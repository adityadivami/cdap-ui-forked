/*
 * Copyright © 2022 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import { Button, Container } from '@material-ui/core';
import DrawerWidget from 'components/DrawerWidget';
import T from 'i18n-react';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ActionsWidget from './ActionsWidget';
import { DONE_STEP } from './constants';
import FunctionNameWidget from './FunctionNameWidget';
import SelectColumnsList from './SelectColumnsList';
import SelectColumnsWidget from './SelectColumnsWidget';
import SelectedColumnCountWidget from './SelectedColumnCountWidget';
import { useStyles } from './styles';
import { multipleColumnSelected } from './constants';
import SelectMultipleColumnsList from './SelectMultipleColumnList';

export default function(props) {
  const {
    directiveFunctionSupportedDataType,
    functionName,
    columnData,
    setLoading,
    missingDataList,
  } = props;
  const params = useParams() as any;
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
      selectedColumn:
        selectedColumns.length > 0 ? selectedColumns[0].label : '',
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
    props.applyTransformation(selectedColumns[0].label);
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

  return (
    <Fragment>
      <DrawerWidget
        headingText={T.translate(
          'features.WranglerNewAddTransformation.addTransformation'
        )}
        openDrawer={drawerStatus}
        closeClickHandler={closeClickHandler}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            <SelectedColumnCountWidget
              selectedColumnsCount={selectedColumns.length}
            />
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
            {T.translate('features.WranglerNewAddTransformation.applyStep')}
          </Button>
        </Container>
      </DrawerWidget>
      <DrawerWidget
        headingText={T.translate(
          'features.WranglerNewAddTransformation.selectColumn'
        )}
        openDrawer={columnsPopup}
        showBackIcon={true}
        closeClickHandler={closeSelectColumnsPopupWithoutColumn}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            {multipleColumnSelected.filter((el) => el.value === functionName)
              .length > 0 ? (
              <SelectMultipleColumnsList
                columnData={columnData}
                selectedColumnsCount={selectedColumns.length}
                setSelectedColumns={setSelectedColumns}
                dataQuality={missingDataList}
                directiveFunctionSupportedDataType={
                  directiveFunctionSupportedDataType
                }
                functionName={functionName}
              />
            ) : (
              <SelectColumnsList
                columnData={columnData}
                selectedColumnsCount={selectedColumns.length}
                setSelectedColumns={setSelectedColumns}
                dataQuality={missingDataList}
                directiveFunctionSupportedDataType={
                  directiveFunctionSupportedDataType
                }
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
}
