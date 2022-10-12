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

export const useStyles = makeStyles({
  datasetInput: {
    height: '40px',
    width: '350px',
  },
  inputInfo: {
    display: 'flex',
    gap: '14px',
  },
  infoIcon: {
    color: '#757575',
    fontSize: '20px',
    cursor: 'pointer',
  },
  infoIconContainer: {
    margin: 'auto',
  },
  datasetInputLabel: {
    fontFamily: 'Roboto',
    fontStyle: ' normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '150%',
    letterSpacing: '0.15px',
    color: ' #616161',
  },
  textField: {
    padding: '0px',
  },
  outlinedInput: {
    padding: '0px',
    '& .MuiOutlinedInput-input': {
      padding: '5px 20px',
      height: '30px',
    },
  },
  customTooltip: {
    width: '100px',
    backgroundColor: 'black',
  },
});
