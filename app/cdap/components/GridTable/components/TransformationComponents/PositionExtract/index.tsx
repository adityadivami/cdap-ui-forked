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
import NewColumnInput from '../InputComponents/NewColumnInput';
import { useStyles } from '../styles';

export default function GridTextCell({
  anchorEl,
  setAnchorEl,
  setTextSelectionRange,
  textSelectionRange,
  columnSelected,
  applyTransformation,
  cancelTransformation,
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
            Extract using postion
          </Typography>
          <Typography className={classes.popoverText} variant="body1">
            {`Extract characters ${textSelectionRange.start}-${textSelectionRange.end} from this column to a new column`}
          </Typography>
          <NewColumnInput column={column} setColumnName={setColumnName} isError={isError} />

          <Button
            className={classes.applyStepButtonStyles}
            onClick={applyDirective}
            variant="contained"
          >
            Apply
          </Button>
          <Button className={classes.popoverText} onClick={handleClose} variant="text">
            Exit 'Extract' mode
          </Button>
        </Box>
      </Popover>
    </>
  );
}
