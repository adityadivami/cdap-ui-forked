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
import { useStyles } from 'components/ColumnInsights/Components/ColumnToggleButton/styles';
import { IDataQualityProps } from 'components/ColumnInsights/Components/ColumnToggleButton/types';
import { PREFIX } from 'components/ColumnInsights/constants';
import T from 'i18n-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import ToggleButton from 'components/ColumnInsights/Components/ToggleButton';

const StyledDataQualityBox = styled(Box)`
    &&& { 
      width: 100%;
      display: flex;
      align-items: center;
      background-color: rgb(255, 255, 255);
      justify-content: center
      filter : drop-shadow(0px 2px 4px rgba(68, 132, 245, 0.25));
      border-radius: 4px;
      margin-top: 20px;
    }
`;

export default function({ dataQuality }: IDataQualityProps) {
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState<number>(0);
  return (
    <StyledDataQualityBox data-testid={'data-quality-toggle-parent'}>
      <ToggleButton
        type={'left'}
        setIsSelected={setIsSelected}
        className={isSelected === 1 ? classes.isSelected : ''}
      >
        <>
          {T.translate(`${PREFIX}.empty`).toString()}
          {` ${dataQuality.emptyValueCount} (${dataQuality.emptyValuePercentage}%)`}
        </>
      </ToggleButton>

      <ToggleButton
        type={'right'}
        setIsSelected={setIsSelected}
        className={isSelected === 2 ? classes.isSelected : ''}
      >
        <>
          {T.translate(`${PREFIX}.null`)}
          {` ${dataQuality?.nullValueCount} (${dataQuality?.nullValuePercentage}%)`}
        </>
      </ToggleButton>
    </StyledDataQualityBox>
  );
}
