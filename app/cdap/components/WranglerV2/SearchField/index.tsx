/*
 * Copyright © 2023 Cask Data, Inc.
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
import { Box, Divider, Input, InputProps, Link, Typography } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import T from 'i18n-react';
import styled from 'styled-components';
import { grey } from '@material-ui/core/colors';

export interface IDirectiveSuggestionProps {
  link: string;
  usage: string;
}

export interface ISearchFieldProps {
  onPostfixIconClick: () => void;
  inputProps: InputProps;
  directiveSuggestion: IDirectiveSuggestionProps;
}

export const InputWrapper = styled(Input)`
  &&& {
    width: 100%;
    margin: 0px 5px;
    outline: 0;
    background: transparent;
    color: #ffffff;
    & .MuiInputBase-input {
      padding: 0px;
      height: 12px;
      color: #ffffff;
      font-size: 14px;
    }
  }
`;

const PrefixIconWrapper = styled(Box)`
  color: #94ec98;
`;

const PostfixIconWrapper = styled(CloseOutlinedIcon)`
  cursor: pointer;
`;

const DirectiveWrapper = styled(Box)`
  padding: 0px 15px;
`;

const DividerLine = styled(Divider)`
  &.MuiDivider-root {
    background-color: ${grey[300]};
    opacity: 0.2;
    margin-bottom: 10px;
  }
`;

const InfoLink = styled(Link)`
  &&& {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #a1c2fa;
    font-size: 14px;
    text-decoration: none;
    margin-left: 35px;
    width: 217px;
    cursor: pointer;
  }
`;

const StyledInfoOutlinedIcon = styled(InfoOutlinedIcon)`
  &&& {
    color: #a1c2fa;
    width: 20px;
    height: 20px;
  }
`;

const DirectivesUsageText = styled(Typography)`
  &&& {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.15;
    color: #ffffff;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

const DirectiveFieldWrapper = styled(Box)`
  &&& {
    background: ${grey[700]};
    padding: 20px;
    color: #ffffff;
    min-height: 82px;
  }
`;

const SearchFieldWrapper = styled(Box)`
  &&& {
    display: flex;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const PREFIX = 'features.WranglerNewUI.DirectivePanel';

export default function SearchField({
  onPostfixIconClick,
  inputProps,
  directiveSuggestion,
}: ISearchFieldProps) {
  return (
    <DirectiveFieldWrapper>
      {directiveSuggestion?.usage && (
        <DirectiveWrapper data-testid="directive-usage-text-wrapper">
          <DirectivesUsageText variant="body1" data-testid="directive-usage-text">
            {`${T.translate(`${PREFIX}.usage`)} : `}
            {directiveSuggestion.usage}
            {directiveSuggestion.link && (
              <InfoLink data-testid="info-link" href={directiveSuggestion.link} target="_blank">
                <StyledInfoOutlinedIcon data-testid="info-icon" />
                {T.translate(`${PREFIX}.moreInfoOnDirective`)}
              </InfoLink>
            )}
          </DirectivesUsageText>
          <DividerLine />
        </DirectiveWrapper>
      )}
      <SearchFieldWrapper>
        <PrefixIconWrapper>$</PrefixIconWrapper>
        <InputWrapper {...inputProps} disableUnderline={true} />
        <PostfixIconWrapper onClick={onPostfixIconClick} />
      </SearchFieldWrapper>
    </DirectiveFieldWrapper>
  );
}
