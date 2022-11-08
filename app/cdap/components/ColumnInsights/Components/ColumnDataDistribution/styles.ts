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

import { blue, grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    columnInsightsDataQualityTopSection: {
      padding: '20px 0',
    },
    columnInsightsColumnName: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    distribution: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '150%',
      letterSpacing: 0.15,
      color: grey[900],
    },

    viewFullChart: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '150%',
      letterSpacing: 0.15,
      color: blue[500],
      margin: 'auto 0px',
    },
    columnDataQualityGraph: {
      '& .axis': {
        display: 'none',
      },

      '& .bar': {
        fill: blue[500],
      },

      '& .graph': {
        transform: 'translate(0px, 20px) !important',
      },
    },
  };
});
