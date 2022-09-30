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

import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((_theme: Theme) => ({
  progress: {
    position: 'relative',
    margin: '4px',
    float: 'left',
    textAlign: 'center',
  },
  barOverflow: {
    position: 'relative',
    overflow: 'hidden' /* Comment this line to understand the trick */,
    width: '60px',
    height: '30px' /* Half circle (overflow) */,
    marginBottom: '-20px !important' /* bring the numbers up */,
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '59px',
    height: '59px',
    borderRadius: '50%',
    boxSizing: 'border-box',
    border: ' 4px solid #dbdbdb' /* half gray, */,
    //    transform: rotate(63deg),
  },
  value: {
    fontSize: '14px !important',
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
  },
}));
