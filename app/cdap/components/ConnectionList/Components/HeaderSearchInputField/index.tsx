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

import { IHeaderSearchInputFieldProps } from 'components/ConnectionList/types';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const RenderInput = styled.input`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
  width: 100%;
  background-color: #ffffff;
  border: none;
  height: ${(props) => (props.inputHeight ? props.inputHeight : '35px')};
  outline: 0;
`;

const SearchInput = styled(RenderInput)`
  margin-left: 9px;
`;

export default function({ type, refs, onChange, columnIndex }: IHeaderSearchInputFieldProps) {
  return (
    <SearchInput
      inputHeight="21px"
      type={type}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, columnIndex)}
      ref={(e: HTMLInputElement) => {
        refs.current[columnIndex] = e;
      }}
    />
  );
}
