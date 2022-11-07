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
import { grey } from '@material-ui/core/colors';
export const useStyles = makeStyles(() => {
  return {
    columnsCountTextStyles: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '150%',
      letterSpacing: 0.15,
      color: grey[700],
      paddingTop: 5,
      paddingBottom: 15,
    },
    selectColumnsHeaderStyles: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    searchFormControl: {
      position: 'relative',
      display: 'flex',
    },
    searchInputAdornment: {
      zIndex: 0,
      cursor: 'pointer',
      position: 'absolute',
      right: 0,
    },
    isFocused: {
      border: 'none',
      borderBottom: `1px solid ${grey[700]}`,
      outline: 'none',
    },
    isBlurred: {
      border: 'none',
      borderBottom: '1px solid transparent',
    },
    noRecordWrapper: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },
    innerWrapper: {
      textAlign: 'center',
    },
  };
});
