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

import React, { useEffect, useState } from 'react';
import { BarChart } from 'react-easy-chart';
import styled from 'styled-components';
import { Box, IconButton, Modal } from '@material-ui/core';
import { grey, blue } from '@material-ui/core/colors';

const ToolTipDiv = styled(Box)`
  background: #ffffff;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2), 0px 9px 10px rgba(0, 0, 0, 0.14),
    0px 5px 14px rgba(0, 0, 0, 0.12);
  font-size: 12px;
  line-height: 150%;
  color: ${grey[900]};
  top: ${({ top }) => (top ? top : '0')};
  left: ${({ left }) => (left ? left : '0')};
  position: absolute;
  padding: 10px;
`;

const GraphContainer = styled(Box)`
  position: relative;
  padding-top: 10px;
  padding-left: 30px;
  padding-bottom: 10px;
  & .bar {
    fill: ${blue[500]} !important;
    background: ${blue[500]} !important;
  }
  &:hover .bar {
    fill: ${blue[500]} !important;
    background: ${blue[500]} !important;
    opacity: 0.5 !important;
  }
  & .bar:hover {
    fill: ${blue[500]} !important;
    background: ${blue[500]} !important;
    opacity: 1 !important;
  }
`;

export default function({
    graphData,
    distinctValues,
}){
    const [barData, setBarData] = useState([]);
    const [toolTipData, setToolTipData] = useState({
      showToolTip: false,
      top: '',
      left: '',
      y: '',
      x: '',
    });
    useEffect(() => {
        const updatedBarData = [];
        graphData?.map((item) => {
          updatedBarData.push({
            x: item.text,
            y: item.value,
          });
        });
        setBarData(updatedBarData);
      }, []);
    const mouseOverHandler = (d, e) => {
        setToolTipData({
          showToolTip: true,
          top: `${e.offsetY - 10}px`,
          left: `${e.offsetX + 10}px`,
          y: d.y,
          x: d.x,
        });
      };
      const mouseMoveHandler = (e) => {
      };
      const mouseOutHandler = () => {
        setToolTipData({
          showToolTip: false,
          top: ``,
          left: ``,
          y: '',
          x: '',
        });
      };
    return(
        <GraphContainer>
        <BarChart
          height={50}
          width={30 * distinctValues}
          data={barData}
          mouseOverHandler={mouseOverHandler}
          mouseOutHandler={mouseOutHandler}
        />
        {toolTipData.showToolTip && (
          <ToolTipDiv
            top={toolTipData.top}
            left={toolTipData.left}
          >{`${toolTipData.x} : ${toolTipData.y}`}</ToolTipDiv>
        )}
      </GraphContainer>
    )
}