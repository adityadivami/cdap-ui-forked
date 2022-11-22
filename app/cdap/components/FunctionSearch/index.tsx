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

import { Box, InputAdornment } from '@material-ui/core';
import MyDataPrepApi from 'api/dataprep';
import {
  ArrowIcon,
  AutoSearch,
  ClearSearchIcon,
  CustomPaperComponent,
  CustomTextField,
  DirectiveContainer,
  DirectiveDescription,
  DirectiveDescriptionContainer,
  DirectiveName,
  SearchBox,
  SearchIcon,
  SearchResultsContainer,
  SearchResultsHeader,
  SearchResultsHeaderText,
  Underline
} from 'components/FunctionSearch/CustomComponents';
import T from 'i18n-react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import NamespaceStore from 'services/NamespaceStore';

const PREFIX = 'features.WranglerNewUI.GridPage';
interface ISearchResult {
  description: string;
  directive: string;
}

export default function({ transformationPanel }) {
  const [searchResults, setSeachResults] = useState<ISearchResult[]>([]);
  const [displayRecentSearches, setDisplayRecentSearches] = useState(false);
  const [textFieldInput, setTextFieldInput] = useState('');
  const [selectedDirective, setSelectedDirective] = useState('');
  const [recentSearches, setRecentSearches] = useState<ISearchResult[]>([]);

  const getDirectivesList = () => {
    const namespace = NamespaceStore.getState().selectedNamespace;
    MyDataPrepApi.getUsage({ context: namespace }).subscribe((res) => {
      setSeachResults([...res.values]);
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextFieldInput(e.target.value);
    if (e.target.value === '') {
      setDisplayRecentSearches(true);
    } else {
      setDisplayRecentSearches(false);
    }
  };

  const handleClose = () => {
    setDisplayRecentSearches(true);
  };

  const handleOptionClick = (selectedOption:ISearchResult) => {
    setTextFieldInput('');
    setSelectedDirective(selectedOption.directive);
    transformationPanel(selectedOption.directive);
    const currentRecentSearch = selectedOption;
    const array = [...recentSearches];
    const filterredSearchResults = array.filter(
      (item) => item.directive !== currentRecentSearch.directive
    );
    if (recentSearches.length > 4) {
      array.splice(-1);
      setRecentSearches([currentRecentSearch, ...filterredSearchResults]);
    } else {
      setRecentSearches([currentRecentSearch, ...filterredSearchResults]);
    }
    if (textFieldInput === '') {
      setDisplayRecentSearches(false);
    }
  };

  useEffect(() => {
    getDirectivesList();
    if (textFieldInput === '') {
      setDisplayRecentSearches(true);
    }
  }, []);

  useEffect(() => {
    if (textFieldInput === '') {
      setDisplayRecentSearches(true);
    } else {
      setDisplayRecentSearches(false);
    }
  }, [textFieldInput]);

  const CustomPaper = (props) => {
    return (
      <Box>
        {recentSearches.length > 0 && displayRecentSearches && (
          <SearchResultsHeader>
            <SearchResultsHeaderText component="p">
              {T.translate(`${PREFIX}.toolbarIcons.labels.recentResults`)}
            </SearchResultsHeaderText>
            <Underline/>
          </SearchResultsHeader>
        )}
        {searchResults.length > 0 && textFieldInput?.length > 0 && (
          <SearchResultsHeader>
            <SearchResultsHeaderText component="p">
              {T.translate(`${PREFIX}.toolbarIcons.labels.searchResults`)}
            </SearchResultsHeaderText>
            <Underline/>
          </SearchResultsHeader>
        )}
        <CustomPaperComponent elevation={0} {...props} />
      </Box>
    );
  };

  return (
    <SearchBox>
      <AutoSearch
        options={displayRecentSearches ? recentSearches : searchResults}
        getOptionLabel={(option) =>
          searchResults.length ? option.directive.concat(`(${option.description})`) : ''
        }
        autoHighlight={true}
        PaperComponent={CustomPaper}
        onClose={handleClose}
        selectOnFocus
        clearOnBlur={true}
        clearOnEscape={true}
        inputValue={textFieldInput}
        renderOption={(option) => (
          <>
            <SearchResultsContainer
              key={option.directive}
              onClick={() => handleOptionClick(option)}
              role="button"
            >
              <DirectiveContainer>
                <DirectiveName variant="body1">{option.directive}</DirectiveName>
                <DirectiveDescriptionContainer>
                  <DirectiveDescription variant="body1">{option.description}</DirectiveDescription>
                  <ArrowIcon />
                </DirectiveDescriptionContainer>
              </DirectiveContainer>
            </SearchResultsContainer>
          </>
        )}
        renderInput={(params) => (
          <CustomTextField
            placeholder={T.translate(`${PREFIX}.toolbarIcons.labels.placeHolder`)}
            {...params}
            variant="outlined"
            onBlur = {()=>setTextFieldInput('')}
            onChange={(e) => handleInputChange(e)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                  <></>
                </>
              ),
              endAdornment: (
                <>
                  <InputAdornment position="end">
                    {textFieldInput?.length > 0 && (
                      <ClearSearchIcon onClick={() => setTextFieldInput('')} />
                    )}
                  </InputAdornment>
                </>
              ),
            }}
          />
        )}
      />
    </SearchBox>
  );
}
