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

import { Typography, Popover, Button, Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import NewColumnInput from 'components/GridTable/components/TransformationComponents/InputComponents/NewColumnInput';
import { useStyles } from 'components/GridTable/components/TransformationComponents/styles';
import T from 'i18n-react';
import ButtonWidget from 'components/AddTransformation/ButtonWidget';

const PREFIX = 'features.WranglerNewUI.GridPage.transformationUI.extract.extractUsingPosition';

export default function GridTextCell({
  anchorEl,
  setAnchorEl,
  textSelectionRange,
  columnSelected,
  applyTransformation,
  optionSelected,
  headers,
  open,
  handleClose,
}) {
  const classes = useStyles();
  const [column, setColumnName] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (headers?.filter((el) => el === column)?.length) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [column]);

  const applyDirective = () => {
    if (optionSelected === 'using-positions') {
      if (!Boolean(column)) {
        return;
      }
      const directive = `cut-character :${columnSelected} :${column} ${textSelectionRange.start}-${textSelectionRange.end}`;
      applyTransformation(directive);
      handleClose();
    }
    setAnchorEl(null);
  };

  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box className={classes.popoverBox}>
          <Typography className={classes.popoverHead} variant="h5">
            {T.translate(`${PREFIX}.extractPosition`)}
          </Typography>
          <Typography className={classes.popoverText} variant="body1">
            {`${T.translate(`${PREFIX}.extractCharacter`)} ${textSelectionRange.start}-${
              textSelectionRange.end
            } ${T.translate(`${PREFIX}.fromThisColumnToNew`)}`}
          </Typography>
          <NewColumnInput column={column} setColumnName={setColumnName} isError={isError} />
          <Box className={classes.extractPositionButtonGroup}>
            <ButtonWidget
              buttonText={T.translate(`${PREFIX}.apply`).toString()}
              className={classes.applyStepButtonStyles}
              onClick={applyDirective}
              variant="contained"
              disabled={false}
              buttonId="apply-button"
            />
            <ButtonWidget
              buttonText={T.translate(`${PREFIX}.exitMode`).toString()}
              className={classes.popoverText}
              onClick={handleClose}
              variant="text"
              disabled={false}
              buttonId="exit-button"
            />
          </Box>
        </Box>
      </Popover>
    </>
  );
}
