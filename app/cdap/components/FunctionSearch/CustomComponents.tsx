/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

import React from 'react';
import { Box, Paper, TextField, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const ArrowIcon = styled(ChevronRightRoundedIcon)`
  color: ${grey[700]};
  font-size: large;
`;

export const AutoSearch = styled(Autocomplete)`
  &.Mui-focused{
    & .MuiAutocomplete-inputFocused{
      border-bottom: none !important;
    };
    outline: 1px solid #DADCE0;
    box-shadow: 3px 4px 15px rgba(68, 132, 245, 0.15);
  }
  &.MuiAutocomplete-input{
    border-bottom: 0px solid #E0E0E0;
  }
  &.MuiAutocomplete-option{
    height: 71px;
  }
`

export const ClearSearchIcon = styled(ClearOutlinedIcon)`
  color: ${grey[600]};
  font-size: xx-large;
  cursor: pointer;
`;

export const CustomPaperComponent = styled(Paper)`
  margin-top: -1px;
  border: 1px solid #dadce0; // this color not available in MUI colors
  border-top: none;
  border-radius: 0;
  & MuiAutocomplete-noOptions {
    padding: 0px;
    margin: 0px;
    border-radius: 0;
  }
  & ul#combo-box-demo-popup.MuiAutocomplete-listbox {
    padding: 0px;
    margin: 0px;
    background: white;
    border-radius: 0px;
  }
  ,
  & div.MuiAutocomplete-noOptions {
    background: white;
  }
`;

export const CustomTextField = styled(TextField)`
  outline: none;
  height: 48px;
  width: 490px;
  right: 6px;
  margin-left: 5px;
  & .root {
    color: red;
    & input::placeholder {
      font-size: 14px;
    }
  }
  & .MuiOutlinedInput-root {
    border-radius: 0px;
    & fieldset {
      border: 0px solid #dadce0 !important;
    }
    &:hover {
      border: 0px solid #dadce0 !important;
      outline: 0;
    }
    padding-nottom: 8px !important;
    padding-right: 14px !important;
  }
`;

export const DirectiveContainer = styled(Box)`
  padding: 15px 10px;
`;

export const DirectiveName = styled(Typography)`
  color: ${grey[900]};
`;

export const DirectiveDescriptionContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
`;
export const DirectiveDescription = styled(Typography)`
  color: ${grey[700]};
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  textoverflow: ellipsis;
`;

export const SearchIcon = styled(SearchOutlinedIcon)`
  color: ${grey[600]};
  font-size: xx-large;
`;

export const SearchResultsHeaderText = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  // line-height: 150%;
  letter-spacing: 0.15px;
  color: #000000;
`;

export const SearchBox = styled(Box)`
  & .MuiOutlinedInput-root {
    border-radius: 0px;
    &:hover {
      outline: none !important;
    }
  }
  & button.MuiAutocomplete-popupIndicator.MuiButtonBase-root.MuiIconButton-root {
    display: none;
  }
  & div.MuiAutocomplete-endAdornment {
    padding-right: 7px;
  }
`;

export const SearchResultsHeader = styled(Box)`
  background-color: #ffffff;
  padding: 10px 15px 0px 26px;
  boxshadow: inset 3px 4px 15px rgba(68, 132, 245, 0.15);
  display:flex;
  flex-direction:column;
  gap: 0;

`;

export const SearchResultsContainer = styled(Box)`
  width: 450px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 71px;
`;

export const Underline = ()=> (
  <svg width="67" height="3" viewBox="0 0 67 3" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M-0.00012207 0.530273H49.9999L52.9999 2.5318H2.99988L-0.00012207 0.530273Z"
      fill="#3994FF"
    />
    <path d="M53.9999 0.530273H63.4999L66.4999 2.5318H56.9999L53.9999 0.530273Z" fill="#3994FF" />
  </svg>
);
