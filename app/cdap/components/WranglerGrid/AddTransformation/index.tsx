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

import DrawerWidget from 'components/DrawerWidget';
import T from 'i18n-react';
import React, { Fragment, useState, useEffect } from 'react';
import SelectColumnsList from 'components/WranglerGrid/AddTransformation/SelectColumnsList';
import {
  IAddTransformationProps,
  IHeaderNamesList,
  IMultipleSelectedFunctionDetail,
  IDataQualityItem,
  ITransformationComponentValues,
} from 'components/WranglerGrid/AddTransformation/types';
import { getDataQuality } from 'components/common/DataQualityCircularProgressBar/utils';
import {
  multipleColumnSelected,
  ADD_TRANSFORMATION_PREFIX,
} from 'components/WranglerGrid/AddTransformation/constants';
import {
  AddTransformationBodyWrapper,
  AddTransformationWrapper,
} from 'components/common/BoxContainer';
import { AddTransformationButton } from 'components/common/ButtonWidget';
import FunctionNameWidget from 'components/WranglerGrid/AddTransformation/FunctionNameWidget';
import SelectColumnsWidget from 'components/WranglerGrid/AddTransformation/SelectColumnsWidget';
import SelectedColumnCountWidget from 'components/WranglerGrid/AddTransformation/SelectedColumnCountWidget';
import { enableDoneButton, getDirective } from 'components/WranglerGrid/AddTransformation/utils';
import { Box, Divider } from '@material-ui/core';
import styled from 'styled-components';
import TransformationContent from 'components/WranglerGrid/TransformationComponents';
import { transformationComponentDefaultValues } from 'components/WranglerGrid/AddTransformation/constants';
import { CALCULATE_OPTIONS } from 'components/WranglerGrid/NestedMenu/menuOptions/calculateOptions';

const CountWidgetWrapper = styled(Box)`
  padding: 10px 0;
`;

export default function({
  transformationDataType,
  transformationName,
  columnsList,
  missingItemsList,
  onCancel,
  applyTransformation,
}: IAddTransformationProps) {
  const [drawerStatus, setDrawerStatus] = useState<boolean>(true);
  const [columnsPopup, setColumnsPopup] = useState<boolean>(false);
  const [selectedColumns, setSelectedColumns] = useState<IHeaderNamesList[]>([]);
  const [dataQualityValue, setDataQualityValue] = useState<IDataQualityItem[]>([]);
  const [transformationComponentValues, setTransformationComponentsValue] = useState<
    ITransformationComponentValues
  >(transformationComponentDefaultValues);

  const closeClickHandler = () => {
    onCancel();
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
      transformationName,
      selectedColumns[0].label,
      transformationComponentValues
    );
    applyTransformation(directive);
    setDrawerStatus(false); // TODO process of sending value || or directive of function selected
  };

  useEffect(() => {
    const getPreparedDataQuality: IDataQualityItem[] = getDataQuality(
      missingItemsList,
      columnsList
    );
    setDataQualityValue(getPreparedDataQuality);
    setTransformationComponentsValue({
      ...transformationComponentValues,
      columnNames: columnsList?.length > 0 ? columnsList.map(({ label }) => label) : [],
    });
  }, []);

  const isComponentAvailable = CALCULATE_OPTIONS.some(
    (item) => item?.value?.toLowerCase() === transformationName.toLowerCase()
  );

  return (
    <Fragment>
      <DrawerWidget
        headingText={T.translate(`${ADD_TRANSFORMATION_PREFIX}.addTransformation`)}
        openDrawer={drawerStatus}
        closeClickHandler={closeClickHandler}
        dataTestId="add-transformation-drawer"
      >
        <AddTransformationWrapper>
          <AddTransformationBodyWrapper>
            <CountWidgetWrapper>
              <SelectedColumnCountWidget selectedColumnsCount={selectedColumns?.length} />
            </CountWidgetWrapper>
            <Divider />
            <FunctionNameWidget transformationName={transformationName} />
            <SelectColumnsWidget
              handleSelectColumn={handleSelectColumn}
              selectedColumns={selectedColumns}
              transformationName={transformationName}
            />
            {isComponentAvailable && (
              <TransformationContent
                setTransformationComponentsValue={setTransformationComponentsValue}
                transformationComponent={[]}
                transformationComponentValues={transformationComponentValues}
                transformationName={transformationName}
                transformationDataType={transformationDataType}
                columnsList={columnsList}
                missingItemsList={missingItemsList}
                onCancel={onCancel}
                applyTransformation={applyTransformation}
              />
            )}
          </AddTransformationBodyWrapper>
          <AddTransformationButton
            disabled={selectedColumns?.length ? false : true}
            color="primary"
            data-testid="apply-step-button"
            onClick={handleApply}
          >
            {T.translate(`${ADD_TRANSFORMATION_PREFIX}.applyStep`)}
          </AddTransformationButton>
        </AddTransformationWrapper>
      </DrawerWidget>
      <DrawerWidget
        headingText={T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectColumnPara`)}
        openDrawer={columnsPopup}
        showBackIcon={true}
        closeClickHandler={closeSelectColumnsPopupWithoutColumn}
        dataTestId="select-column-drawer"
      >
        <AddTransformationWrapper>
          <AddTransformationBodyWrapper>
            <SelectColumnsList
              columnsList={columnsList}
              selectedColumnsCount={selectedColumns.length}
              setSelectedColumns={setSelectedColumns}
              dataQuality={dataQualityValue}
              transformationDataType={transformationDataType}
              transformationName={transformationName}
              selectedColumns={selectedColumns}
            />
          </AddTransformationBodyWrapper>
          <AddTransformationButton
            disabled={enableDoneButton(transformationName, selectedColumns)}
            color="primary"
            data-testid="button_done"
            onClick={closeSelectColumnsPopup}
          >
            {T.translate(`${ADD_TRANSFORMATION_PREFIX}.done`)}
          </AddTransformationButton>
        </AddTransformationWrapper>
      </DrawerWidget>
    </Fragment>
  );
}
