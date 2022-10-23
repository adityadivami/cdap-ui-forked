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
  IDirectiveComponentValues,
} from './types';
import { prepareDataQualtiy } from './CircularProgressBar/utils';
import FunctionNameWidget from './FunctionNameWidget';
import SelectColumnsWidget from './SelectColumnsWidget';
import SelectedColumnCountWidget from './SelectedColumnCountWidget';
import ButtonWidget from './ButtonWidget';
import { getDirective } from './utils';
import { DIRECTIVE_COMPONENTS } from 'components/GridTable/constants';
import { CALCULATE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/calculateOptions';
import DirectiveContent from 'components/GridTable/DirectiveComponents';

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
  >({
    copyColumnName: '',
    columnNames: columnData.map(({ label }) => label),
  });

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
      directiveComponentValues,
      selectedColumns
    );
    applyTransformation(directive);
    setDrawerStatus(false); // TODO process of sending value || or directive of function selected
  };

  useEffect(() => {
    const getPreparedDataQuality: IDataQuality[] = prepareDataQualtiy(missingDataList, columnData);
    setDataQualityValue(getPreparedDataQuality);
  }, []);

  const isComponentAvailable =
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
