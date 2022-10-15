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

import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles({
  error: {
    borderRadius: '4px',
    width: '100%',
    top: '48px !important',
    backgroundColor: red[600],
    padding: '15px 18px 14px 18px',
    display: 'block',
    minHeight: '76px',
  },
  success: {
    boxShadow: '2px 2px 8px rgba(97, 97, 97, 0.2);',
    width: '100%',
    top: '48px !important',
    backgroundColor: green[600],
    padding: '15px 18px 14px 18px',
    display: 'block',
    borderRadius: '4px',
    minHeight: '76px',
  },
  MUIanchor: {
    left: '0px',
  },
  MUIRoot: {
    left: '0px',
  },
});
