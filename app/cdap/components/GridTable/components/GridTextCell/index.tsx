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

import {
  Card,
  TableCell,
  Typography,
  Popover,
  Button,
  Box,
  FormGroup,
  FormHelperText,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useGridTextCellStyles } from './styles';
import { IGridTextCellProps } from './types';
import { getPattern } from 'components/GridTable/directives';
import FormInputFieldComponent from 'components/GridTable/DirectiveComponents/ParseComponent/FormInputFieldComponent';

export default function GridTextCell({
  cellValue,
  maskSelection,
  rowNumber,
  columnSelected,
  applyTransformation,
  cancelTransformation,
  optionSelected,
  headers,
}: IGridTextCellProps) {
  const classes = useGridTextCellStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [column, setColumnName] = useState('');
  const [isError, setIsError] = useState(false);
  const [textSelectionRange, setTextSelectionRange] = useState({
    start: null,
    end: null,
  });

  const mouseUpHandler = (event) => {
    if (!maskSelection) {
      return;
    }

    const currentSelection = window.getSelection().toString();
    let startRange, endRange;

    if (currentSelection.length) {
      startRange = window.getSelection().getRangeAt(0).startOffset;
      endRange = window.getSelection().getRangeAt(0).endOffset;
      setAnchorEl(event.currentTarget);
      setTextSelectionRange({
        start: startRange,
        end: endRange,
      });
    } else {
      setTextSelectionRange({
        start: null,
        end: null,
      });
      setAnchorEl(null);
      cancelTransformation();
    }
  };

  const applyDirective = () => {
    if (optionSelected === 'custom-selection') {
      const pattern = getPattern(textSelectionRange, rowNumber, columnSelected);
      const directive = `mask-number :${columnSelected} ${pattern}`;
      applyTransformation(directive);
    } else if (optionSelected === 'using-positions') {
      if (!Boolean(column)) {
        return;
      }
      const directive = `cut-character :${columnSelected} :${column} ${textSelectionRange.start}-${textSelectionRange.end}`;
      applyTransformation(directive);
    }
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setTextSelectionRange({
      start: null,
      end: null,
    });
    cancelTransformation();
  };

  const handleColumnName = (event) => {
    if (headers.includes(event.target.value)) {
      setIsError(true);
      setColumnName(event.target.value);
    } else {
      setIsError(false);
      setColumnName(event.target.value);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <TableCell
        className={
          maskSelection
            ? `${classes.tableRowCell} ${classes.highlightedColumn}`
            : classes.tableRowCell
        }
        onMouseUp={mouseUpHandler}
      >
        <Card
          className={maskSelection ? `${classes.root} ${classes.highlightedColumn}` : classes.root}
          variant="outlined"
        >
          <Typography className={classes.cell} data-testid={`grid-text-cell-${cellValue}`}>
            {cellValue}
          </Typography>
        </Card>
      </TableCell>
      {optionSelected == 'custom-selection' && (
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
              Mask Data
            </Typography>
            <Typography className={classes.popoverText} variant="body1">
              Mask the selected characters across all rows in this column
            </Typography>
            <Button
              className={classes.applyStepButtonStyles}
              onClick={applyDirective}
              variant="contained"
            >
              Apply
            </Button>
            <Button className={classes.popoverText} onClick={handleClose} variant="text">
              Exit 'Mask Data' mode
            </Button>
          </Box>
        </Popover>
      )}
      {optionSelected == 'using-positions' && (
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
            <FormGroup>
              <div className={classes.formLabelStyles}>Name destination column*</div>
              <FormInputFieldComponent
                formInputValue={column}
                classnames={classes.formFieldStyles}
                inputProps={{
                  classes: { underline: classes.underlineStyles, input: classes.inputStyles },
                  type: 'text',
                  value: column,
                  onChange: (e) => handleColumnName(e),
                  color: 'primary',
                  placeholder: 'DESTINATION COLUMN*',
                }}
              />
              {isError && (
                <FormHelperText error={isError}>Column name already exist</FormHelperText>
              )}
            </FormGroup>
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
      )}
    </>
  );
}
