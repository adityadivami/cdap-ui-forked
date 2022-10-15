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

import { makeStyles } from '@material-ui/core/styles';

export const useGridTextCellStyles = makeStyles({
  root: {
    minWidth: '216px',
    backgroundColor: '#fff',
    padding: '5px 5px 5px 30px',
    borderRadius: '0px',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
  },
  tableRowCell: {
    minWidth: '151px',
    border: '1px solid #E0E0E0',
    fontSize: '14px',
    width: 'auto',
    lineHeight: '21px',
    padding: '0px',
    borderBottom: '1px solid #E0E0E0',
    color: '#5F6368',
    boxSizing: 'content-box',
    paddingBottom: '5px',
  },
  cell: {
    lineHeight: '21px',
    fontSize: '14px',
    fontWeight: 400,
    color: '#5F6368',
    marginBottom: '0px',
  },
  highlightedColumn: {
    backgroundColor: '#3b78e7',
  },
  applyStepButtonStyles: {
    width: '162px',
    height: '36px',
    background: '#3994FF',
    boxShadow: '0px 2px 4px rgba(70, 129, 244, 0.15)',
    borderRadius: '4px',
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '15px',
    lineHeight: '26px',
    letterSpacing: '0.46px',
    color: '#FFFFFF',
    alignSelf: 'flex-end',
    marginTop: '30px',
    textTransform: 'none',
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: '#3994FF',
    },
  },
  popoverBox: {
    padding: '10px',
  },
  popoverHead: {
    fontSize: '16px',
    borderBottom: '1px solid #E0E0E0',
    color: '#5F6368',
    marginBottom: '5px',
    fontWeight: 600,
    fontFamily: 'Noto Sans',
  },
  popoverText: {
    fontSize: '14px',
    color: '#5F6368',
    fontWeight: 400,
    fontFamily: 'Noto Sans',
  },
  formFieldStyles: {
    width: 'calc(100% - 60px)',
    marginRight: '60px',
    border: '1px solid #DADCE0',
    height: '40px',
    padding: '5px 15px',
    fontSize: '14px',
    background: '#FFFFFF',
    fontFamily: 'Noto Sans',
    borderRadius: '4px',
    marginLeft: 0,
  },
  underlineStyles: {
    width: '100%',
    '&:before': {
      border: 'none',
    },
    '&:hover:not(.Mui-disabled):before': {
      border: 'none',
    },
    '&:after': {
      border: 'none',
    },
  },
  inputStyles: {
    width: '100%',
    '&:focus': {
      outline: 'none',
    },
  },
  formLabelStyles: {
    color: '#5F6368',
    fontSize: '14px',
    fontStyle: 'normal',
    marginTop: '10px',
    fontFamily: 'Noto Sans',
    fontWeight: 400,
    lineHeight: '150%',
    letterSpacing: '0.15px',
    marginBottom: '10px',
  },
});
