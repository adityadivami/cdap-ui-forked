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
import SelectColumnsList from 'components/AddTransformation/SelectColumnsList';
import { useStyles } from 'components/AddTransformation/styles';
import {
  IAddTransformationProps,
  IHeaderNamesList,
  IMultipleSelectedFunctionDetail,
  IDataQualityItem,
} from 'components/AddTransformation/types';
import { getDataQuality } from 'components/AddTransformation/CircularProgressBar/utils';
import {
  multipleColumnSelected,
  ADD_TRANSFORMATION_PREFIX,
} from 'components/AddTransformation/constants';

export default function({
  transformationDataType,
  transformationName,
  columnsList,
  missingItemsList,
  onCancel,
}: IAddTransformationProps) {
  const [columnsPopup, setColumnsPopup] = useState<boolean>(true);
  const [selectedColumns, setSelectedColumns] = useState<IHeaderNamesList[]>([]);
  const [dataQualityValue, setDataQualityValue] = useState<IDataQualityItem[]>([]);
  const classes = useStyles();

  const closeSelectColumnsPopup = () => {
    setColumnsPopup(false);
    onCancel();
  };

  const closeSelectColumnsPopupWithoutColumn = () => {
    setColumnsPopup(false);
    setSelectedColumns([]);
    onCancel();
  };

  useEffect(() => {
    const getPreparedDataQuality: IDataQualityItem[] = getDataQuality(
      missingItemsList,
      columnsList
    );
    setDataQualityValue(getPreparedDataQuality);
  }, []);

  const enableDoneButton = () => {
    if (
      multipleColumnSelected.filter(
        (functionNameDetail: IMultipleSelectedFunctionDetail) =>
          functionNameDetail.value === transformationName && !functionNameDetail.isMoreThanTwo
      )?.length
    ) {
      return selectedColumns?.length === 2 ? false : true;
    } else if (
      multipleColumnSelected.filter(
        (functionNameDetail: IMultipleSelectedFunctionDetail) =>
          functionNameDetail.value === transformationName && functionNameDetail.isMoreThanTwo
      )?.length
    ) {
      return selectedColumns?.length >= 1 ? false : true;
    } else {
      return selectedColumns?.length >= 1 ? false : true;
    }
  };

  return (
    <Fragment>
      <DrawerWidget
        headingText={T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectColumnPara`)}
        openDrawer={columnsPopup}
        showBackIcon={true}
        closeClickHandler={closeSelectColumnsPopupWithoutColumn}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            <SelectColumnsList
              columnsList={columnsList}
              selectedColumnsCount={selectedColumns.length}
              setSelectedColumns={setSelectedColumns}
              dataQuality={dataQualityValue}
              transformationDataType={transformationDataType}
              transformationName={transformationName}
            />
          </div>
          <Button
            variant="contained"
            disabled={enableDoneButton()}
            color="primary"
            data-testid="button_apply"
            classes={{ containedPrimary: classes.buttonStyles }}
            className={classes.applyStepButtonStyles}
            onClick={closeSelectColumnsPopup}
          >
            {T.translate(`${ADD_TRANSFORMATION_PREFIX}.done`)}
          </Button>
        </Container>
      </DrawerWidget>
    </Fragment>
  );
}
