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
import { IAddTransformationProp, IHeaderNamesList, IDataQuality } from './types';
import { prepareDataQualtiy } from './CircularProgressBar/utils';

export default function({
  directiveFunctionSupportedDataType,
  functionName,
  columnData,
  missingDataList,
  callBack,
}: IAddTransformationProp) {
  const [columnsPopup, setColumnsPopup] = useState<boolean>(true);
  const [selectedColumns, setSelectedColumns] = useState([] as IHeaderNamesList[]);
  const [dataQualityValue, setDataQualityValue] = useState([] as IDataQuality[]);
  const classes = useStyles();

  const closeClickHandler = () => {
    callBack();
  };

  const closeSelectColumnsPopup = () => {
    setColumnsPopup(false);
  };

  const closeSelectColumnsPopupWithoutColumn = () => {
    setColumnsPopup(false);
    setSelectedColumns([]);
    closeClickHandler();
  };

  useEffect(() => {
    const getPreparedDataQuality: IDataQuality[] = prepareDataQualtiy(missingDataList, columnData);
    setDataQualityValue(getPreparedDataQuality);
  }, []);

  return (
    <Fragment>
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
              selectedColumnsCount={selectedColumns.length}
              setSelectedColumns={setSelectedColumns}
              dataQuality={dataQualityValue}
              directiveFunctionSupportedDataType={directiveFunctionSupportedDataType}
              functionName={functionName}
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
            {T.translate('features.WranglerNewAddTransformation.done')}
          </Button>
        </Container>
      </DrawerWidget>
    </Fragment>
  );
}
