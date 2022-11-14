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

import { grey, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    columnInsightsTopSection: {
      paddingBottom: 20,
      borderBottom: `1px solid ${grey[300]}`,
    },
    columnNameEdit: {
      display: 'flex',
      gap: 12,
      marginTop: 5,
    },
    editIcon: {
      cursor: 'pointer',
      padding: '0px 0px',
      justifyContent: 'flex-start !important',
    },
    selectFieldStyles: {
      width: 350,
      height: 40,
      background: '#FFFFFF',
      border: '1px solid #DADCE0',
      borderRadius: 4,
      padding: '5px 15px',

      fontSize: 14,
      marginTop: 9,

      '&:before': {
        display: 'none',
      },

      '&:focus-visible': {
        outline: 'none !important',
      },

      '&:after': {
        display: 'none',
      },
    },
    optionStyles: {
      fontSize: 14,
      lineHeight: '150%',
      letterSpacing: 0.15,
      color: grey[900],
    },
    selectIconStyles: {
      top: 'calc(50% - 10px)',
      right: 10,
    },
    selectStyles: {
      '&:focus': {
        'background-color': 'transparent',
      },
    },
    columnInsightsDetailsWrapper: {
      marginTop: 20,
    },
    columnInsightsDetailsCountSection: {
      display: 'flex',
      gap: 27,
      alignItems: 'center',
      marginBottom: 7,
    },
  };
});
