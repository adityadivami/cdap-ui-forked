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
import { grey } from '@material-ui/core/colors';
export const useStyles = makeStyles(() => {
  return {
    tabledisplayStyles: {
      display: 'flex',
      flexDirection: 'column',
    },
    recipeStepsTableRowStyles: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '150%',
      letterSpacing: 0.15,
      color: grey[700],
      padding: 5,
      height: 64,
    },
    rowsOfTable: {
      display: 'grid',
      gridTemplateColumns: '10% 45% 45%',
      alignItems: 'center',
    },
    recipeStepsActionTypeStyles: {
      fontWeight: 400,
      maxWidth: 190,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: 14,
      marginBottom: 5,
      textTransform: 'capitalize',
    },
  };
});
