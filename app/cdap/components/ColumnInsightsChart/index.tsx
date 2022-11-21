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

import { Box, IconButton, Modal } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import RenderLabel from 'components/ColumnInsights/Components/common/RenderLabel';
import BarChart from 'react-bar-chart';
import blue from '@material-ui/core/colors/blue';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import T from 'i18n-react';
import { grey } from '@material-ui/core/colors';

export const PREFIX = 'features.NewWranglerUI.ColumnInsightsChart';

interface IColumnInsightsChartProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  graphData: IGraphData[];
  columnName: string;
  distinctValues: number;
}

interface IGraphData {
  text: string;
  value: number;
}

const CustomizedModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 1200px;
  height: 400px;
  background-color: white;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 3px 4px 15px rgba(33, 150, 243, 0.15);
  outline: none !important;
`;

const ModalHeading = styled(Box)`
  border-bottom: 1px solid ${grey[300]};
  padding: 4px 9px 20px 10px;
  display: flex;
  justify-content: space-between;
`;

const DistributionData = styled(Box)`
  padding: 20px 10px 40px 10px;
  min-height: 90px;
  display: flex;
  gap: 40px;
`;

const GraphContainer = styled(Box)`
  overflow-x: scroll;
  & .axis {
    display: none;
  }

  & .bar {
    fill: ${blue[500]};
  }
`;

export default function({
  open,
  setOpen,
  graphData,
  columnName,
  distinctValues,
}: IColumnInsightsChartProps) {
  const handleClose = () => setOpen(false);

  const barChartProps = {
    margin: { top: 20, right: 20, bottom: 70, left: 20 },
    width: distinctValues < 50 ? 400 : distinctValues * 12,
    height: 200,
  };

  return (
    <Modal open={open} onClose={handleClose} data-testid="view-full-chart-modal">
      <CustomizedModalContent data-testid="view-full-chart-modal-content">
        <ModalHeading>
          <RenderLabel fontSize={20} dataTestId="distribution">
            <>{T.translate(`${PREFIX}.distribution`)}</>
          </RenderLabel>
          <IconButton onClick={handleClose} data-testid="close-icon-button">
            <CloseRoundedIcon />
          </IconButton>
        </ModalHeading>
        <DistributionData>
          <RenderLabel dataTestId="column-name">
            <>
              {T.translate(`${PREFIX}.columnName`)}
              {columnName}
            </>
          </RenderLabel>
          <RenderLabel dataTestId="distinct-values">
            <>{T.translate(`${PREFIX}.distinct`) + `${distinctValues}`}</>
          </RenderLabel>
        </DistributionData>
        <GraphContainer>
          <BarChart ylabel={`${PREFIX}.barChartYLabel`} {...barChartProps} data={graphData} />
        </GraphContainer>
      </CustomizedModalContent>
    </Modal>
  );
}
