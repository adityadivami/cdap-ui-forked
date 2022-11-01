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

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  divider: {
    borderColor: '#DADCE0',
  },
  heading: {
    fontSize: 14,
    fontWeight: 600,
    color: '#5F6368',
    padding: '0 21',
  },
  root: {
    '& .MuiMenuItem-root': {
      padding: '6 11 6 20',
      height: 33,
    },
    '& .MuiMenu-paper': {
      width: 199,
    },
    '& .MuiMenu-list': {
      color: '#5F6368',
      border: '1 solid #DADCE0',
    },
    '& .MuiListItem-button': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& .MuiList-padding': {
      padding: '13 0',
    },
  },
});
