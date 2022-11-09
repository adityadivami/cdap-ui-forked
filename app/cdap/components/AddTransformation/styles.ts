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
    addTransformationBodyStyles: {
      height: 'calc(100% - 100px)',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
    },
    addTransformationBodyWrapperStyles: {
      height: 'calc(100% - 40px)',
      overflowY: 'auto',
    },
    applyStepButtonStyles: {
      width: 162,
      height: 36,
      background: blue[500],
      boxShadow: '0px 2px 4px rgba(70, 129, 244, 0.15)',
      borderRadius: 4,
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 15,
      lineHeight: '26px',
      letterSpacing: 0.46,
      color: '#FFFFFF',
      alignSelf: 'flex-end',
      marginTop: 30,
      textTransform: 'none',
      marginBottom: 20,
      marginRight: 8,
    },
    buttonStyles: {
      '&:hover': {
        backgroundColor: blue[500],
      },
    },
  };
});
