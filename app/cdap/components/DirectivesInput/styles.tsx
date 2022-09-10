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
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles({
  container: {
    height: '82px',
    background: grey[700],
    padding: '13px 13px 21px 20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  ampersand: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '14px',
    letterSpacing: '0.15px',
    color: '#94EC98',
    paddingTop: '8px',
  },
  input: {
    '& .MuiInputBase-input': {
      color: 'white',
      paddingTop: '7px',
      fontSize: '14px',
    },
    minWidth: '1319px',
  },
  crossIcon: {
    color: 'white',
    fontSize: '33px',
  },
  inputAndAmpersand: {
    display: 'flex',
    gap: '5px',
  },
  directiveAndAutocomplete: {
    boxShadow: '-3px -4px 15px rgba(68, 132, 245, 0.25)',
  },
});
