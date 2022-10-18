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
import React, { Fragment, useState } from 'react';
import SelectColumnsList from './SelectColumnsList';
import { useStyles } from './styles';
import SelectMultipleColumnsList from './SelectMultipleColumnList';
import { multipleColumnSelected } from './constants';
import FunctionNameWidget from './FunctionNameWidget';
import SelectColumnsWidget from './SelectColumnsWidget';
import SelectedColumnCountWidget from './SelectedColumnCountWidget';
import ActionsWidget from './ActionsWidget';

export default function(props) {
  const {
    directiveFunctionSupportedDataType,
    functionName,
    columnData,
    missingDataList,
    applyTransformation,
  } = props;
  const [drawerStatus, setDrawerStatus] = useState(true);
  const [columnsPopup, setColumnsPopup] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');
  const [replaceValue, setReplaceValue] = useState('');

  const classes = useStyles();

  const closeClickHandler = () => {
    props.callBack();
    setDrawerStatus(false);
  };

  const closeSelectColumnsPopup = () => {
    setColumnsPopup(false);
  };

  const closeSelectColumnsPopupWithoutColumn = () => {
    setColumnsPopup(false);
    setSelectedColumns([]);
  };

  const handleSelectColumn = () => {
    setColumnsPopup(true);
  };

  const handleApply = (event) => {
    applyTransformation('', selectedColumns[0].label);
    setDrawerStatus(false); // TODO process of sending value || or directive of function selected
  };

  return (
    <Fragment>
      <DrawerWidget
        headingText={T.translate('features.WranglerNewAddTransformation.addTransformation')}
        openDrawer={drawerStatus}
        closeClickHandler={closeClickHandler}
      >
        <Container className={classes.addTransformationBodyStyles}>
          <div className={classes.addTransformationBodyWrapperStyles}>
            <SelectedColumnCountWidget selectedColumnsCount={selectedColumns.length} />
            <FunctionNameWidget functionName={functionName} />
            <SelectColumnsWidget
              handleSelectColumn={handleSelectColumn}
              selectedColumns={selectedColumns}
              functionName={functionName}
            />
            {functionName == 'remove-null' && (
              <ActionsWidget
                functionName={functionName}
                setSelectedAction={setSelectedAction}
                selectedAction={selectedAction}
                setReplaceValue={setReplaceValue}
                replaceValue={replaceValue}
              />
            )}
          </div>
          <Button
            variant="contained"
            disabled={selectedColumns.length ? false : true}
            color="primary"
            classes={{ containedPrimary: classes.buttonStyles }}
            className={classes.applyStepButtonStyles}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleApply(e)}
            data-testid="add-transformation-button"
          >
            {T.translate('features.WranglerNewAddTransformation.applyStep')}
          </Button>
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
            {multipleColumnSelected.filter((el) => el.value === functionName).length > 0 ? (
              <SelectMultipleColumnsList
                columnData={columnData}
                selectedColumnsCount={selectedColumns.length}
                setSelectedColumns={setSelectedColumns}
                dataQuality={missingDataList}
                directiveFunctionSupportedDataType={directiveFunctionSupportedDataType}
                functionName={functionName}
              />
            ) : (
              <SelectColumnsList
                columnData={columnData}
                selectedColumnsCount={selectedColumns.length}
                setSelectedColumns={setSelectedColumns}
                dataQuality={missingDataList}
                directiveFunctionSupportedDataType={directiveFunctionSupportedDataType}
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
            {T.translate('features.WranglerNewAddTransformation.done')}
          </Button>
        </Container>
      </DrawerWidget>
    </Fragment>
  );
}
