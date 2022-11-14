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

import styled from 'styled-components';
import { grey } from '@material-ui/core/colors';
import { Input } from '@material-ui/core';

export const SelectColumnSearchInput = styled.input`
  margin-right: 5px;
  border: none;
  border-bottom: 1px solid transparent;
  &:focus {
    border-bottom: 1px solid ${grey[700]};
    outline: none;
  }
`;


export const InputComponent = styled(Input)`
  &.MuiInput-underline {
    width: 100%;
    &:before {
      border: none;
    }
    &:hover:not(.Mui-disabled):before {
      border: none;
    }
    &:after {
      border: none;
    }
    &.MuiInput-underline.Mui-disabled:before {
      border-bottom-style: unset;
    }
  }
  &.MuiInput-input {
    width: 100%;
    &:focus {
      outline: none;
    }
  }
`;
