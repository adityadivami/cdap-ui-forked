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

import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import SearchField, { IDirectiveSuggestionProps } from 'components/WranglerV2/SearchField';
import SearchResultsList from 'components/WranglerV2/SearchResultsList';
import { ISearchResultListItemProps } from 'components/WranglerV2/SearchResultsListItem';

export interface IDirectivePanelProps {
  directiveSuggestion: IDirectiveSuggestionProps;
  applyDirective: (value: string) => void;
  resultsList: ISearchResultListItemProps[];
  handleSearchResultClick: () => void;
}

const DirectiveWrapper = styled(Box)`
  position: relative;
`;

export default function DirectivePanel({
  directiveSuggestion,
  resultsList,
  handleSearchResultClick,
  applyDirective,
}: IDirectivePanelProps) {
  const [searchValue, setSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setAnchorEl(event.target);
  };
  return (
    <DirectiveWrapper>
      <SearchField
        inputProps={{
          value: searchValue,
          onChange: handleSearch,
        }}
        onPostfixIconClick={() => setSearchValue('')}
        directiveSuggestion={directiveSuggestion}
      />
      <SearchResultsList
        resultsList={resultsList}
        handleClick={handleSearchResultClick}
        showIcon={false}
        anchorEl={anchorEl}
        handleClose={() => setAnchorEl(null)}
      />
    </DirectiveWrapper>
  );
}
