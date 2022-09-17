/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  '.MuiAutocomplete-popper': {
    background: 'red !important',
  },
  autoComplete: {
    maxWidth: '490px',
    borderRadius: '0px',
    border: '1px solid #DADCE0',
    boxShadow: '3px 4px 15px rgba(68, 132, 245, 0.15)',
  },
  textField: {
    minHeight: '49px',
    maxWidth: '490px',
  },
  suggestions: {
    borderBottom: '1px solid #E0E0E0',
    width: '450px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  content: {
    padding: '15px 10px',
  },
});
