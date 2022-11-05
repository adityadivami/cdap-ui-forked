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
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles({
  recipeContainer: {
    padding: '10px 32px',
    cursor: 'pointer',
    textAlign: 'center',
    gap: 8,
    width: 184,
    height: 40,
    background: 'linear-gradient(180deg, #4681f400 0.85%, #4681f433 118.78%)',
    borderLeft: '1px solid rgba(57, 148, 255, 0.4)',
    display: 'flex',
  },
  recipeStepsCount: {
    backgroundColor: grey[600],
    height: 21,
    width: 20,
    color: '#FFFFFF',
    borderRadius: 4,
  },
});
