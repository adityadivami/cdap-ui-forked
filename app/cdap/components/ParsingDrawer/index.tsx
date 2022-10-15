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
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { createWorkspace } from 'components/Connections/Browser/GenericBrowser/apiHelpers';
import { ConnectionsContext } from 'components/Connections/ConnectionsContext';
import DataPrepStore from 'components/DataPrep/store';
import DrawerWidget from 'components/DrawerWidget';
import PositionedSnackbar from 'components/SnackbarComponent/index';
import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import ParsingHeaderActionTemplate from './Components/ParsingHeaderActionTemplate';
import ParsingPopupBody from './Components/ParsingPopupBody';
import { PARSING_INFO_TEXT } from './constants';
import { useStyles } from './styles';
import T from 'i18n-react';

const ParsingDrawer = (props) => {
  const { setLoading } = props;
  const [drawerStatus, setDrawerStatus] = useState(true);
  const [formatValue, setFormatValue] = useState('');
  const [encodingValue, setEncodingValue] = useState('');
  const [quotedValuesChecked, setQuotedValuesChecked] = useState(false);
  const [headerValueChecked, setHeaderValueChecked] = useState(false);
  const [schemaValue, setSchemaValue] = useState(null);
  const { dataprep } = DataPrepStore.getState();
  const { onWorkspaceCreate } = useContext(ConnectionsContext);
  const [errorOnTranformation, setErrorOnTransformation] = useState({
    open: false,
    message: '',
  });
  const [connectionPayload, setConnectionPayload] = useState({
    path: '',
    connection: '',
    sampleRequest: {
      properties: {
        format: formatValue,
        fileEncoding: encodingValue,
        skipHeader: headerValueChecked,
        enableQuotedValues: quotedValuesChecked,
        schema: schemaValue,
        _pluginName: null,
      },
      limit: 1000,
    },
  });
  const classes = useStyles();

  useEffect(() => {
    setConnectionPayload({
      path: dataprep.insights.path,
      connection: dataprep.insights.name,
      sampleRequest: {
        properties: {
          format: formatValue,
          fileEncoding: encodingValue,
          skipHeader: headerValueChecked,
          enableQuotedValues: quotedValuesChecked,
          schema: schemaValue != null ? JSON.stringify(schemaValue) : null,
          _pluginName: null,
        },
        limit: 1000,
      },
    });
    setDrawerStatus(true);
  }, [dataprep, formatValue, encodingValue, quotedValuesChecked, headerValueChecked, schemaValue]);

  const closeClickHandler = () => {
    setDrawerStatus(false);
  };

  const handleFormatChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as string;
    setFormatValue(value);
  };

  const handleEncodingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as string;
    setEncodingValue(value);
  };

  const handleQuoteValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuotedValuesChecked(event.target.checked);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderValueChecked(event.target.checked);
  };

  const handleSchemaUpload = (schema) => {
    setSchemaValue(schema);
  };

  const handleApply = (event: React.MouseEvent<HTMLButtonElement>) => {
    onConfirm(connectionPayload);
  };

  const createWorkspaceInternal = async (entity, parseConfig = {}) => {
    try {
      setLoading(true);
      const wid = await createWorkspace({
        entity,
        connection: dataprep.insights.name,
        properties: connectionPayload.sampleRequest.properties,
      });
      if (onWorkspaceCreate) {
        return onWorkspaceCreate(wid);
      }
      setDrawerStatus(false);
      props.updateDataTranformation(wid);
    } catch (err) {
      setErrorOnTransformation({
        open: true,
        message: 'Selected Transformation Cannot Be Applied',
      });
      setLoading(false);
    }
  };

  const onConfirm = async (parseConfig) => {
    try {
      await createWorkspaceInternal(connectionPayload, parseConfig);
    } catch (e) {
      setLoading(false);
      console.log('error', e);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setErrorOnTransformation({ open: false, message: '' });
  };

  const componentToRender = (
    <DrawerWidget
      headingText={T.translate('features.WranglerNewParsingDrawer.parsing')}
      openDrawer={setDrawerStatus}
      showDivider={true}
      headerActionTemplate={
        <ParsingHeaderActionTemplate
          handleSchemaUpload={(schema) => handleSchemaUpload(schema)}
          setErrorOnTransformation={setErrorOnTransformation}
        />
      }
      closeClickHandler={closeClickHandler}
      data-testid="drawer-widget"
    >
      <Box className={classes.bodyContainerStyles}>
        <ParsingPopupBody
          formatValue={formatValue}
          handleFormatChange={handleFormatChange}
          encodingValue={encodingValue}
          handleEncodingChange={handleEncodingChange}
          quotedValuesChecked={quotedValuesChecked}
          handleQuoteValueChange={handleQuoteValueChange}
          headerValueChecked={headerValueChecked}
          handleCheckboxChange={handleCheckboxChange}
        />

        <Box className={classes.bottomSectionStyles}>
          <Box className={classes.infoWrapperStyles}>
            <InfoOutlinedIcon />
            <span className={classes.infoTextStyles}>
              {T.translate('features.WranglerNewParsingDrawer.parsingInfoText')}
            </span>
          </Box>
          <Button
            variant="contained"
            color="primary"
            classes={{ containedPrimary: classes.buttonStyles }}
            className={classes.applyButtonStyles}
            onClick={(e: MouseEvent<HTMLButtonElement>) => handleApply(e)}
            data-testid="parsing-apply-button"
          >
            {T.translate('features.WranglerNewParsingDrawer.apply')}
          </Button>
        </Box>
      </Box>
      {errorOnTranformation.open && (
        <PositionedSnackbar
          handleCloseError={handleClose}
          messageToDisplay={errorOnTranformation.message}
        />
      )}
    </DrawerWidget>
  );

  return drawerStatus && componentToRender;
};

export default ParsingDrawer;
