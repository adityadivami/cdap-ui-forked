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

import React from 'react';
import { StyledButton } from '../shared.styles';
import T from 'i18n-react';
import styled from 'styled-components';

const PREFIX = 'features.Administration.Tethering';

const ButtonsContainer = styled.div`
  margin-left: -30px;
  box-sizing: border-box;
  height: 30px;
`;

const GridCellButtons = styled(StyledButton)`
  font-size: 0.9rem;
  width: 90px;
  height: 18px;
`;

interface INewReqLastColumnProps {
  instanceName: string;
  handleAcceptOrReject: (action: string, peer: string) => void;
}

const NewReqLastColumn = ({ instanceName, handleAcceptOrReject }: INewReqLastColumnProps) => {
  return (
    <ButtonsContainer>
      <GridCellButtons onClick={() => handleAcceptOrReject('accept', instanceName)}>
        {T.translate(`${PREFIX}.PendingRequests.acceptButton`)}
      </GridCellButtons>
      <GridCellButtons onClick={() => handleAcceptOrReject('reject', instanceName)}>
        {T.translate(`${PREFIX}.PendingRequests.rejectButton`)}
      </GridCellButtons>
    </ButtonsContainer>
  );
};

export default NewReqLastColumn;
