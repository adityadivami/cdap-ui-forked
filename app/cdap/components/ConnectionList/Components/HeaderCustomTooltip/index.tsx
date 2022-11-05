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

import { Box } from '@material-ui/core';
import CustomTooltip from 'components/ConnectionList/Components/CustomTooltip';
import HeaderCustomTooltipLabel from 'components/ConnectionList/Components/HeaderCustomTooltipLabel';
import { IHeaderCustomTooltipProps } from 'components/ConnectionList/types';
import React from 'react';

export default function({
  headersRefs,
  index,
  dataForTabs,
  filteredData,
}: IHeaderCustomTooltipProps) {
  return headersRefs.current[index]?.offsetWidth < headersRefs.current[index]?.scrollWidth ? (
    <CustomTooltip title={dataForTabs[index - 1].selectedTab} arrow>
      <Box>
        <HeaderCustomTooltipLabel
          index={index}
          headersRefs={headersRefs}
          filteredData={filteredData}
        />
      </Box>
    </CustomTooltip>
  ) : (
    <HeaderCustomTooltipLabel index={index} headersRefs={headersRefs} filteredData={filteredData} />
  );
}
