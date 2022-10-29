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

import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    formFieldStyles: {
      width: 'calc(100% - 60px)',
      marginRight: '60px',
      border: '1px solid #DADCE0',
      height: '40px',
      padding: '5px 15px',
      fontSize: '14px',
      background: '#FFFFFF',
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
      '&.MuiInput-underline.Mui-disabled:before': {
        borderBottomStyle: 'unset',
      },
    },
    inputStyles: {
      width: '100%',
      '&:focus': {
        outline: 'none',
      },
    },
    checkboxStyles: {
      display: 'flex',
      width: '100%',
      marginBottom: 0,
    },
    selectFormGroup: {
      width: 'calc(100% - 60px)',
      marginRight: '60px',
      border: '1px solid #DADCE0',
      height: '40px',
      padding: '5px 15px',
      fontSize: '14px',
      background: '#FFFFFF',
      borderRadius: '4px',
      marginLeft: 0,
      marginBottom: 5,
    },
    selectInputRoot: {
      color: '#5F6368',
      '&:before': {
        border: 'none',
      },
    },
    menuItemText: {
      color: '#5F6368',
    },
  };
});
