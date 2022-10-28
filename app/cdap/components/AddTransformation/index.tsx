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
import React, { Fragment, useState, useEffect } from 'react';
import SelectColumnsList from './SelectColumnsList';
import { useStyles } from './styles';
import {
  IAddTransformationProp,
  IHeaderNamesList,
  IDataQuality,
  ITransformationComponentValues,
} from './types';
import { prepareDataQualtiy } from './CircularProgressBar/utils';
import FunctionNameWidget from './FunctionNameWidget';
import SelectColumnsWidget from './SelectColumnsWidget';
import SelectedColumnCountWidget from './SelectedColumnCountWidget';
import ButtonWidget from './ButtonWidget';
import { getDirective } from './utils';
import TransformationContent from 'components/GridTable/components/TransformationComponents';
import { transformationComponentDefaultValues } from './constants';
import { CALCULATE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/calculateOptions';
import { TRANSFORMATION_COMPONENTS } from 'components/GridTable/constants';

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
  const [transformationComponentValues, setTransformationComponentsValue] = useState<
    ITransformationComponentValues
  >(transformationComponentDefaultValues);

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
    const directive: string | null = getDirective(
      functionName,
      selectedColumns[0].label,
      transformationComponentValues
    );
    applyTransformation(directive);
    setDrawerStatus(false); // TODO process of sending value || or directive of function selected
  };

  useEffect(() => {
    const getPreparedDataQuality: IDataQuality[] = prepareDataQualtiy(missingDataList, columnData);
    setDataQualityValue(getPreparedDataQuality);
  }, []);

  const isComponentAvailable =
    TRANSFORMATION_COMPONENTS?.some((item) => item?.type === functionName) ||
    CALCULATE_OPTIONS?.some((item) => item?.value?.toLowerCase() === functionName?.toLowerCase());

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
              <TransformationContent
                setTransformationComponentsValue={setTransformationComponentsValue}
                transformationComponent={TRANSFORMATION_COMPONENTS}
                transformationComponentValues={transformationComponentValues}
                functionName={functionName}
                transformationFunctionSupportedDataType={directiveFunctionSupportedDataType}
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
