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
  small: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '8px 32px',
    gap: 8,
    width: 88,
    height: 40,
    borderLeft: '1px solid #3994ff66',
    flex: 'none',
    order: 0,
    flexGrow: 0,
    '&:hover': {
      cursor: 'pointer',
    },
    background: 'linear-gradient(180deg, #4681f400 0.85%, #4681f433 118.78%)',
    borderRight: '1px solid #3994ff66',
  },
  medium: {
    textAlign: 'center',
    padding: '9.5px 12px',
    gap: 8,
    width: '10%',
    height: 40,
    background: 'linear-gradient(180deg, #4681f400 0.85%, #4681f433 118.78%)',

    borderLeft: '1px solid rgba(57, 148, 255, 0.4)',
    cursor: 'pointer',
  },
  large: {
    width: '65%',
    padding: '9.5px 32px',
  },
});
