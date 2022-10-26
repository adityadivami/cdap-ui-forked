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

import { Container } from '@material-ui/core';
import DrawerWidget from 'components/DrawerWidget';
import T from 'i18n-react';
import React, { Fragment, useState, useEffect } from 'react';
import SelectColumnsList from 'components/AddTransformation/SelectColumnsList';
import { useStyles } from 'components/AddTransformation/styles';
import {
  IAddTransformationProps,
  IHeaderNamesList,
  IMultipleSelectedFunctionDetail,
  IDataQualityItem,
} from 'components/AddTransformation/types';
import { getDataQuality } from 'components/AddTransformation/CircularProgressBar/utils';
import { multipleColumnSelected } from 'components/AddTransformation/constants';
import FunctionNameWidget from 'components/AddTransformation/FunctionNameWidget';
import SelectColumnsWidget from 'components/AddTransformation/SelectColumnsWidget';
import SelectedColumnCountWidget from 'components/AddTransformation/SelectedColumnCountWidget';
import ButtonWidget from 'components/AddTransformation/ButtonWidget';
import { getDirective } from 'components/AddTransformation/utils';
import DirectiveContent from 'components/GridTable/components/DirectiveComponents';
import { directiveComponentDefaultValues } from './constants';
import { CALCULATE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/calculateOptions';

export default function({
  transformationFunctionSupportedDataType,
  functionName,
  columnData,
  missingDataList,
  callBack,
  applyTransformation,
}: IAddTransformationProps) {
  const [drawerStatus, setDrawerStatus] = useState<boolean>(true);
  const [columnsPopup, setColumnsPopup] = useState<boolean>(false);
  const [selectedColumns, setSelectedColumns] = useState<IHeaderNamesList[]>([]);
  const [dataQualityValue, setDataQualityValue] = useState<IDataQualityItem[]>([]);
  const [directiveComponentValues, setDirectiveComponentsValue] = useState<
    IDirectiveComponentValues
  >(directiveComponentDefaultValues);
  const classes = useStyles();
  const closeClickHandler = () => {
    callBack();
    setDrawerStatus(false);
  };

  const closeSelectColumnsPopup = () => {
    setColumnsPopup(false);
    setDrawerStatus(true);
  };

  const closeSelectColumnsPopupWithoutColumn = () => {
    setColumnsPopup(false);
    setSelectedColumns([]);
    setDrawerStatus(true);
  };

  const handleSelectColumn = () => {
    setColumnsPopup(true);
  };

  const handleApply = () => {
    const directive = getDirective(
      functionName,
      selectedColumns[0].label,
      directiveComponentValues
    );
    applyTransformation(directive);
    setDrawerStatus(false); // TODO process of sending value || or directive of function selected
  };

  useEffect(() => {
    const getPreparedDataQuality: IDataQualityItem[] = getDataQuality(missingDataList, columnData);
    setDataQualityValue(getPreparedDataQuality);
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      columnNames: columnData?.length > 0 ? columnData.map(({ label }) => label) : [],
    });
  }, []);

  const enableDoneButton = () => {
    if (
      multipleColumnSelected.filter(
        (functionNameDetail: IMultipleSelectedFunctionDetail) =>
          functionNameDetail.value === functionName && !functionNameDetail.isMoreThanTwo
      )?.length
    ) {
      return selectedColumns?.length === 2 ? false : true;
    } else if (
      multipleColumnSelected.filter(
        (functionNameDetail: IMultipleSelectedFunctionDetail) =>
          functionNameDetail.value === functionName && functionNameDetail.isMoreThanTwo
      )?.length
    ) {
      return selectedColumns?.length >= 1 ? false : true;
    } else {
      return selectedColumns?.length >= 1 ? false : true;
    }
  };

  const isComponentAvailable = CALCULATE_OPTIONS.some(
    (item) => item?.value?.toLowerCase() === functionName.toLowerCase()
  );

  return (
    <Fragment>
      <DrawerWidget
        headingText={T.translate(
          'features.WranglerNewUI.GridPage.addTransformationPanel.addTransformation'
        )}
        openDrawer={drawerStatus}
        closeClickHandler={closeClickHandler}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            <SelectedColumnCountWidget selectedColumnsCount={selectedColumns?.length} />
            <FunctionNameWidget functionName={functionName} />
            <SelectColumnsWidget
              handleSelectColumn={handleSelectColumn}
              selectedColumns={selectedColumns}
              functionName={functionName}
            />
            {isComponentAvailable && (
              <DirectiveContent
                setDirectiveComponentsValue={setDirectiveComponentsValue}
                directiveComponents={[]}
                directiveComponentValues={directiveComponentValues}
                functionName={functionName}
                directiveFunctionSupportedDataType={directiveFunctionSupportedDataType}
                columnData={columnData}
                missingDataList={missingDataList}
                callBack={callBack}
                applyTransformation={applyTransformation}
              />
            )}
          </div>
          <ButtonWidget
            buttonText={T.translate(
              'features.WranglerNewUI.GridPage.addTransformationPanel.applyStep'
            ).toString()}
            className={classes.applyStepButtonStyles}
            onClick={handleApply}
            variant="contained"
            disabled={selectedColumns?.length ? false : true}
            buttonId="apply-step-button"
          />
        </Container>
      </DrawerWidget>
      <DrawerWidget
        headingText={T.translate(
          'features.WranglerNewUI.GridPage.addTransformationPanel.selectColumnPara'
        )}
        openDrawer={columnsPopup}
        showBackIcon={true}
        closeClickHandler={closeSelectColumnsPopupWithoutColumn}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            <SelectColumnsList
              columnData={columnData}
              selectedColumnsCount={selectedColumns.length}
              setSelectedColumns={setSelectedColumns}
              dataQuality={dataQualityValue}
              transformationFunctionSupportedDataType={transformationFunctionSupportedDataType}
              functionName={functionName}
            />
          </div>
          <ButtonWidget
            buttonText={T.translate(
              'features.WranglerNewUI.GridPage.addTransformationPanel.done'
            ).toString()}
            className={classes.applyStepButtonStyles}
            onClick={closeSelectColumnsPopup}
            variant="contained"
            disabled={enableDoneButton()}
            buttonId="done-step-button"
          />
        </Container>
      </DrawerWidget>
    </Fragment>
  );
}
