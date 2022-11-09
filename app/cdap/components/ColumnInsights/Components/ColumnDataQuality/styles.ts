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

import { grey, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    columnInsightsDataQualityTopSection: {
      padding: '20px 0',
      borderBottom: `1px solid ${grey[300]}`,
    },
    qualityBar: {
      display: 'flex',
      marginTop: 20,
    },
    filled: {
      backgroundColor: '#4BAF4F',
      display: 'inline-block',
      height: 5,
      border: '1px solid #4BAF4F',
      borderRadius: 10,
    },
    empty: {
      backgroundColor: red[600],
      display: 'inline-block',
      height: 5,
      border: `1px solid ${red[600]}`,
      borderRadius: 10,
    },
  };
});
