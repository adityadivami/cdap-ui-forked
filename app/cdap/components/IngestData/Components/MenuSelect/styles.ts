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
  select: {
    '& .MuiSelect-outlined.MuiSelect-outlined': {
      padding: '10px 20px',
      height: '20px',
      width: '310px',
    },
  },
  selectInfo: {
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
  customTooltip: {
    width: '100px',
    backgroundColor: 'black',
  },
});
