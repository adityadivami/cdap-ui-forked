/*
 * Copyright © 2017 Cask Data, Inc.
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

import { Box, Typography } from '@material-ui/core';
import MyDataPrepApi from 'api/dataprep';
import { defaultFuseOptions } from 'components/DirectiveInput/constants';
import { IDirectiveUsage, IObject } from 'components/DirectiveInput/types';
import ee from 'event-emitter';
import Fuse from 'fuse.js';
import reverse from 'lodash/reverse';
import Mousetrap from 'mousetrap';
import React, { useEffect, useState } from 'react';
import globalEvents from 'services/global-events';
import NamespaceStore from 'services/NamespaceStore';
import styled from 'styled-components';
import uuidV4 from 'uuid/v4';
import { grey } from '@material-ui/core/colors';
import { IHeaderNamesList } from 'components/GridTable/types';
import { getFormattedSyntax, getLastWordOfSearchItem } from 'components/DirectiveInput/utils';

interface IInputPanelProps {
  setDirectivesList: React.Dispatch<React.SetStateAction<[]>>;
  isDirectiveSet: boolean;
  columnNamesList: IHeaderNamesList[];
  onSearchItemClick: (value: string) => void;
  getDirectiveSyntax: (results: IDirectiveUsage[], value: boolean) => void;
  inputDirective: string;
  setEnterCount: React.Dispatch<React.SetStateAction<number>>
}

const SimpleWrapper = styled(Box)`
  display: block;
`;

const SmallLabel = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.15;
  color: ${grey[700]};
`;

const LargeLabel = styled(SmallLabel)`
  font-weight: 600;
  font-size: 16px;
`;

const ResultRow = styled(Box)`
  padding: 10px;
  border-bottom: 1px solid ${grey[300]};
  background-color: #ffffff;
  &:hover {
    background: #eff0f2;
    cursor: pointer;
  }
`;

const ActiveResultRow = styled(ResultRow)`
  background-color: #eff0f2;
`;

export default function({
  setDirectivesList,
  isDirectiveSet,
  columnNamesList,
  onSearchItemClick,
  getDirectiveSyntax,
  inputDirective,
  setEnterCount
}: IInputPanelProps) {
  const [searchResults, setSearchResults] = useState<IDirectiveUsage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const eventEmitter = ee(ee);
  const [fuse, setFuse] = useState(new Fuse([], { ...defaultFuseOptions }));

  const getUsage = () => {
    if (!isDirectiveSet) {
      MyDataPrepApi.getUsage({ context: NamespaceStore.getState().selectedNamespace }).subscribe(
        (res) => {
          setDirectivesList(res.values);
          setFuse(new Fuse(res.values, { ...defaultFuseOptions }));
        }
      );
    } else {
      setFuse(new Fuse(columnNamesList, { ...defaultFuseOptions, keys: ['label'] }));
    }
  };

  useEffect(() => {
    getUsage();
  }, [isDirectiveSet]);

  useEffect(() => {
    eventEmitter.on(globalEvents.DIRECTIVEUPLOAD, getUsage);

    const directiveInput = document.getElementById('directive-input-search');
    const mousetrap = new Mousetrap(directiveInput);

    mousetrap.bind('up', handleUpArrow);
    mousetrap.bind('down', handleDownArrow);
    mousetrap.bind('enter', handleEnterKey);
    mousetrap.bind('tab', handleTabKey);

    // unbind a keyboard event.
    return () => {
      mousetrap.unbind('up');
      mousetrap.unbind('down');
      mousetrap.unbind('enter');
      mousetrap.unbind('tab');
      eventEmitter.off(globalEvents.DIRECTIVEUPLOAD, getUsage);
    };
  });

  const handleUpArrow = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (selectedIndex !== 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleDownArrow = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (selectedIndex !== searchResults.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleEnterKey = () => {
    console.log('list enter')
    if (inputText.length > 0) {
      if (searchResults[selectedIndex]) {
        handleListItemClick(searchResults[selectedIndex]);
      } else {
        onSearchItemClick(inputText);
      }
    }
  };

  const handleTabKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (inputText.length === 0 || inputText.split(' ').length !== 1) {
      return;
    }
    handleEnterKey();
  };

  useEffect(() => {

    searchMatch(inputDirective);
    setInputText(inputDirective);
  }, [inputDirective]);

  const searchMatch = (searchString: string) => {
    let searchList = [];
    const spaceIndex: boolean = searchString.includes(' '); // As soon as directive is entered, we need column list to appear hence we are checking if space is present in it,
    if (fuse && searchString.length > 0) {
      if (!isDirectiveSet) {
        searchList = fuse
          .search(searchString)
          .slice(0, 3)
          .map((searchItem) => {
            searchItem.uniqueId = uuidV4();
            return searchItem;
          });
        reverse(searchList);
      } else {
        const characterToSearch =  getLastWordOfSearchItem(searchString)
        searchList = fuse.search(characterToSearch).map((searchItem) => {
          searchItem.uniqueId = uuidV4();
          return searchItem;
        });
        reverse(searchList);
      }
    }
    setSearchResults(searchList);
    setInputText(searchString);
    setSelectedIndex(searchList.length - 1);
    if(!isDirectiveSet){
      getDirectiveSyntax(searchList, spaceIndex)
    }
  };

  const handleListItemClick = (listItem) => {
    if (!isDirectiveSet) {
      onSearchItemClick(listItem.item.directive);
      getDirectiveSyntax([listItem], true);
    } else {
      const formattedString = getFormattedSyntax(inputText, listItem.item.label)
      console.log('formattedString', formattedString)
      setInputText(formattedString);
      onSearchItemClick(formattedString);
    }
  };

  return (
    <SimpleWrapper data-testid="input-panel-wraper">
      {searchResults.map((searchItem, searchItemIndex) =>
        searchItemIndex === selectedIndex ? (
          <ActiveResultRow
            key={searchItem.uniqueId}
            onClick={() => handleListItemClick(searchItem)}
            data-testid={`select-directive-list-option-${searchItemIndex}`}
          >
            <SimpleWrapper>
              <LargeLabel data-testid="select-directive-list-label" variant="body1">
                {searchItem?.item?.directive || searchItem?.item?.label}
              </LargeLabel>
              <SmallLabel data-testid="select-directive-list-description" variant="body1">
                {searchItem?.item?.description}
              </SmallLabel>
            </SimpleWrapper>
          </ActiveResultRow>
        ) : (
          <ResultRow
            key={searchItem.uniqueId}
            onClick={() => handleListItemClick(searchItem)}
            data-testid={`select-directive-list-option-${searchItemIndex}`}
          >
            <SimpleWrapper>
              <LargeLabel data-testid="select-directive-list-label" variant="body1">
                {searchItem?.item?.directive || searchItem?.item?.label}
              </LargeLabel>
              <SmallLabel data-testid="select-directive-list-description" variant="body1">
                {searchItem?.item?.description}
              </SmallLabel>
            </SimpleWrapper>
          </ResultRow>
        )
      )}
    </SimpleWrapper>
  );
}
