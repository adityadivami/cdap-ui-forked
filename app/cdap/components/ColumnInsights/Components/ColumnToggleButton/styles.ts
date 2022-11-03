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

import { blue, grey, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    columnInsightsDataQualityTopSection: {
      padding: '20px 0',
      borderBottom: `1px solid ${grey[300]}`,
    },
    columnInsightsColumnName: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '150%',
      letterSpacing: 0.15,
      color: grey[900],
      marginTop: 5,
    },
    columnDataQualityValuesButtons: {},
    dataQualityCard: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgb(255, 255, 255)',
      justifyContent: 'center',
      filter: 'drop-shadow(0px 2px 4px rgba(68, 132, 245, 0.25))',
      borderRadius: 4,
      marginTop: 20,
    },
    missingCountBox: {
      border: '1px solid #DADCE0',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      width: '50%',
      textAlign: 'center',
      padding: 10,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    invalidCountBox: {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      width: '50%',
      textAlign: 'center',
      padding: 10,
      border: '1px solid #DADCE0',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    missingText: {
      color: grey[900],
      fontSize: 14,
      fontWeight: 400,
      fontStyle: 'normal',
      fontFamily: 'Noto Sans',
      letterSpacing: 0.15,
      lineHeight: '150%',
    },
    invalidText: {
      color: red[600],
      fontSize: 14,
      fontWeight: 400,
      fontStyle: 'normal',
      fontFamily: 'Noto Sans',
      letterSpacing: 0.15,
      lineHeight: '150%',
    },
    isSelected: {
      background: '#F3F6F9',
      border: `1px solid ${blue[500]}`,
      boxShadow: 'inset 2px 2px 2px rgba(68, 132, 245, 0.4)',
    },
  };
});
