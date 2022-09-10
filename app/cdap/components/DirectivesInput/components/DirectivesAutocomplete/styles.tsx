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
    padding: '0px 20px',
    ' &:hover': {
      backgroundColor: '#EFF0F2',
    },
  },
  suggestions: {
    height: '81px',
    padding: '15px 14px',
    borderBottom: `1px solid ${grey[300]}`,
  },
  empty: {
    height: '0px',
    padding: '0px',
  },
  directiveTitle: {
    fontSize: '16px',
    fontWeight: 600,
    letterSpacing: '0.15px',
    color: grey[700],
    lineHeight: '24px',
  },
  directiveDescription: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    color: grey[700],
    letterSpacing: '0.15px',
  },
  directiveUsage: {
    background: grey[700],
    color: 'white',
    fontSize: '14px',
    lineHeight: '14px',
    fontWeight: 400,
    letterSpacing: '0.15px',
    padding: '0px 20px',
  },
  directiveUsageWithBorder: {
    padding: '20px 14px',
    borderBottom: '1px solid #DADCE0',
    display: 'flex',
    gap: '20px',
  },
  resultRow: {
    ' &:hover': {
      backgroundColor: '#EFF0F2',
    },
  },
  infoIcon: {
    fontSize: '24px',

    color: '#79B7FF',
  },
  info: {
    display: 'flex',
    gap: '10px',
  },
  usage: {
    paddingTop: '3px',
  },
  infoText: {
    color: '#79B7FF',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.15px',
    paddingTop: '3px',
  },
});
