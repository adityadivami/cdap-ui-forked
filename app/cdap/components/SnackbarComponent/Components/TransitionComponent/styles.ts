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

export const useStyles = makeStyles((theme) => ({
  warningIcon: {
    color: 'white',
    marginRight: '10px',
    fontSize: 'x-large',
  },
  successIcon: {
    fontSize: 'xx-large',
    color: 'white',
    paddingRight: '14px',
    position: 'relative',
    bottom: '4px',
  },
  successLabel: {
    color: 'white',
    fontSize: '16px !important',
    lineHeight: '24px',
    fontWeight: 500,
    letterSpacing: '0.15px',
  },
  failureLabel: {
    color: 'white',
    fontSize: '16px !important',
    lineHeight: '24px',
    fontWeight: 500,
    letterSpacing: '0.15px',
  },
  dismissSpan: {
    display: 'block',
    fontSize: '14px',
    color: 'white',
    cursor: 'pointer',
    lineHeight: '21px',
    fontWeight: 400,
  },
  iconText: {
    display: 'flex',
  },
  message: {
    color: 'white',
    fontSize: '14px',
    paddingLeft: '31px',
  },
  headFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  operations: {
    display: 'flex',
    gap: '13px',
  },
  cross: {
    color: 'white',
    cursor: 'pointer',
  },
}));
