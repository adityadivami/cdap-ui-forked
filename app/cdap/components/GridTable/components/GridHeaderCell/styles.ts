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

import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export const useGridHeaderCellStyles = makeStyles({
  cardHighlighted: {
    minWidth: 216,
    background: '#FFFFFF',
    padding: '10px 0px 10px 30px',
    borderRadius: 0,
    border: 0,
    backgroundImage:
      'linear-gradient(0deg, rgba(70, 129, 244, 0) -49.23%, rgba(70, 129, 244, 0.1) 100%)',
  },
  cardNotHighlighted: {
    minWidth: 216,
    padding: '10px 0px 10px 30px',
    borderRadius: 0,
    border: 0,
    background: '#F1F8FF',
    backgroundImage:
      'linear-gradient(0deg, rgba(70, 129, 244, 0) -49.23%, rgba(70, 129, 244, 0.1) 100%)',
  },
  tableHeaderCell: {
    padding: 0,
    width: 'auto',
    fontSize: 14,
    border: '1px solid #E0E0E0',
    cursor: 'pointer',
    position: 'relative',
  },
  headerHighlitedIcon: {
    position: 'absolute',
    top: 10,
    left: 11,
    display: 'inline',
  },
  notHeaderHighlitedIcon: {
    position: 'absolute',
    top: 10,
    left: 11,
    display: 'none',
  },

  subDataTypeIndicator: {
    marginLeft: 2,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 400,
    color: '#5F6368',
  },
  dataTypeIndicator: {
    fontSize: 14,
    lineHeight: '150%',
    fontWeight: 400,
    color: '#5F6368',
    fontFamily: 'Noto Sans',
    letterSpacing: 0.15,
  },
  columnHeader: {
    fontSize: 14,
    lineHeight: '150%',
    fontWeight: 400,
    marginBottom: 5,
    fontFamily: 'Noto Sans',
    color: grey[900],
    letterSpacing: 0.15,
  },
});
