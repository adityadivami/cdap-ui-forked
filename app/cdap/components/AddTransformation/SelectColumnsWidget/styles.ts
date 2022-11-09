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
import { blue } from '@material-ui/core/colors';
export const useStyles = makeStyles(() => {
  return {
    functionHeadingTextStyles: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
    },
    greenCheckIconStyles: {
      width: 20,
      height: 20,
      marginRight: 5,
    },
    selectedColumnTickIcon: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
      justifyContent: 'space-between',
    },
    quickSelectTextStyles: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
      marginTop: 10,
    },
    selectButtonStyles: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 15,
      lineHeight: '26px',
      letterSpacing: '0.46px',
      color: '#4681F4;',
      textTransform: 'none',
      marginTop: 15,
    },
    functionSectionStyles: {
      padding: '15px 0',
      borderBottom: '1px solid #DADCE0',
    },
  };
});
