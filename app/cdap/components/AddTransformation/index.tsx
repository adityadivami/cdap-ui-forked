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
import ButtonWidget from 'components/AddTransformation/ButtonWidget';
import { prepareDataQualtiy } from 'components/AddTransformation/CircularProgressBar/utils';
import { directiveComponentDefaultValues } from 'components/AddTransformation/constants';
import FunctionNameWidget from 'components/AddTransformation/FunctionNameWidget';
import SelectColumnsList from 'components/AddTransformation/SelectColumnsList';
import SelectColumnsWidget from 'components/AddTransformation/SelectColumnsWidget';
import SelectedColumnCountWidget from 'components/AddTransformation/SelectedColumnCountWidget';
import { useStyles } from 'components/AddTransformation/styles';
import {
  IAddTransformationProp,
  IDataQuality,
  IDirectiveComponentValues,
  IHeaderNamesList,
} from 'components/AddTransformation/types';
import { getDirective } from 'components/AddTransformation/utils';
import DrawerWidget from 'components/DrawerWidget';
import DirectiveContent from 'components/GridTable/components/DirectiveComponents';
import { CALCULATE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/calculateOptions';
import { DIRECTIVE_COMPONENTS } from 'components/GridTable/constants';
import T from 'i18n-react';
import React, { Fragment, useEffect, useState } from 'react';

export default function({
  directiveFunctionSupportedDataType,
  functionName,
  columnData,
  missingDataList,
  callBack,
  applyTransformation,
}: IAddTransformationProp) {
  const [drawerStatus, setDrawerStatus] = useState<boolean>(true);
  const [columnsPopup, setColumnsPopup] = useState<boolean>(false);
  const [selectedColumns, setSelectedColumns] = useState<IHeaderNamesList[]>([]);
  const [dataQualityValue, setDataQualityValue] = useState<IDataQuality[]>([]);
  const [directiveComponentValues, setDirectiveComponentsValue] = useState<
    IDirectiveComponentValues
  >(directiveComponentDefaultValues);

  useEffect(() => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
    });
  }, [selectedColumns]);

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
    const getPreparedDataQuality: IDataQuality[] = prepareDataQualtiy(missingDataList, columnData);
    setDataQualityValue(getPreparedDataQuality);
  }, []);

  const isComponentAvailable: boolean =
    DIRECTIVE_COMPONENTS.some((item) => item.type === functionName) ||
    CALCULATE_OPTIONS.some((item) => item.value === functionName);

  return (
    <Fragment>
      <DrawerWidget
        headingText={T.translate('features.WranglerNewAddTransformation.addTransformation')}
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
                directiveComponents={DIRECTIVE_COMPONENTS}
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
            buttonText={T.translate('features.WranglerNewAddTransformation.applyStep')}
            className={classes.applyStepButtonStyles}
            onClick={handleApply}
            variant="contained"
            disabled={selectedColumns?.length ? false : true}
            dataTestId="apply-step-button"
          />
        </Container>
      </DrawerWidget>
      <DrawerWidget
        headingText={T.translate('features.WranglerNewAddTransformation.selectColumn')}
        openDrawer={columnsPopup}
        showBackIcon={true}
        closeClickHandler={closeSelectColumnsPopupWithoutColumn}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            <SelectColumnsList
              columnData={columnData}
              selectedColumnsCount={selectedColumns?.length}
              setSelectedColumns={setSelectedColumns}
              dataQuality={dataQualityValue}
              directiveFunctionSupportedDataType={directiveFunctionSupportedDataType}
              functionName={functionName}
            />
          </div>
          <ButtonWidget
            buttonText={T.translate('features.WranglerNewAddTransformation.done')}
            className={classes.applyStepButtonStyles}
            onClick={closeSelectColumnsPopup}
            variant="contained"
            disabled={selectedColumns?.length ? false : true}
            dataTestId="done-step-button"
          />
        </Container>
      </DrawerWidget>
    </Fragment>
  );
}
