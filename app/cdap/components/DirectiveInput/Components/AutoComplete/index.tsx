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

import React, { useEffect, useState } from 'react';
import MyDataPrepApi from 'api/dataprep';
import Fuse from 'fuse.js';
import uuidV4 from 'uuid/v4';
import reverse from 'lodash/reverse';
import Mousetrap from 'mousetrap';
import NamespaceStore from 'services/NamespaceStore';
import ee from 'event-emitter';
import globalEvents from 'services/global-events';
import { useStyles } from 'components/DirectiveInput/Components/AutoComplete/styles';
import { Box, Typography } from '@material-ui/core';
import {
  IAutoCompleteProps,
  IOnRowClickValue,
} from 'components/DirectiveInput/Components/AutoComplete/types';

export default function({
  setDirectivesList,
  isDirectiveSelected,
  columnNamesList,
  onRowClick,
  getDirectiveUsage,
  onColumnSelected,
  directiveInput,
}: IAutoCompleteProps) {
  const [activeResults, setActiveResults] = useState([]);
  const [input, setInput] = useState<string>('');
  const [activeSelectionIndex, setActiveSelectionIndex] = useState<number | null>(null);
  const eventEmitter = ee(ee);
  const [fuse, setFuse] = useState(null);
  const classes = useStyles();
  const getUsage = () => {
    if (isDirectiveSelected === false) {
      const namespace = NamespaceStore.getState().selectedNamespace;
      MyDataPrepApi.getUsage({ context: namespace }).subscribe((res) => {
        const fuseOptions = {
          includeScore: true,
          includeMatches: true,
          caseSensitive: false,
          threshold: 0,
          location: 0,
          shouldSort: true,
          distance: 100,
          minMatchCharLength: 1,
          maxPatternLength: 32,
          keys: ['directive'],
        };
        setDirectivesList(res.values);
        setFuse(new Fuse(res.values, fuseOptions));
      });
    } else {
      const fuseOptions = {
        includeScore: true,
        includeMatches: true,
        caseSensitive: false,
        threshold: 0,
        shouldSort: true,
        location: 0,
        distance: 100,
        minMatchCharLength: 1,
        maxPatternLength: 32,
        keys: ['label'],
      };
      setFuse(new Fuse(columnNamesList, fuseOptions));
    }
  };

  useEffect(() => {
    getUsage();
  }, [isDirectiveSelected]);

  useEffect(() => {
    eventEmitter.on(globalEvents.DIRECTIVEUPLOAD, getUsage);
    const directiveInput = document.getElementById('directive-input-search');
    const mousetrap = new Mousetrap(directiveInput);
    mousetrap.bind('up', handleUpArrow);
    mousetrap.bind('down', handleDownArrow);
    mousetrap.bind('enter', handleEnterKey);
    mousetrap.bind('tab', handleTabKey);

    // returned function will be called on component unmount
    return () => {
      mousetrap.unbind('up');
      mousetrap.unbind('down');
      mousetrap.unbind('enter');
      mousetrap.unbind('tab');
      eventEmitter.off(globalEvents.DIRECTIVEUPLOAD, getUsage);
    };
  });
  const handleUpArrow = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (activeSelectionIndex === 0) {
      return;
    }
    setActiveSelectionIndex(activeSelectionIndex - 1);
  };

  const handleDownArrow = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (activeSelectionIndex === activeResults.length - 1) {
      return;
    }
    setActiveSelectionIndex(activeSelectionIndex + 1);
  };

  const handleEnterKey = () => {
    if (input.length === 0) {
      return;
    }
    const selectedDirective = activeResults[activeSelectionIndex];

    if (selectedDirective) {
      handleRowClick(activeResults[activeSelectionIndex]);
    } else {
      const eventObject = {
        target: { value: `${input}` },
      };
      onRowClick(eventObject);
    }
  };

  const handleTabKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (input.length === 0 || input.split(' ').length !== 1) {
      return;
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
    handleEnterKey();
  };

  useEffect(() => {
    if (
      (isDirectiveSelected === true || isDirectiveSelected == undefined) &&
      isDirectiveSelected !== false
    ) {
      const fuseOptions = {
        includeScore: true,
        includeMatches: true,
        caseSensitive: false,
        threshold: 0,
        shouldSort: true,
        location: 0,
        distance: 100,
        minMatchCharLength: 1,
        maxPatternLength: 32,
        keys: ['label'],
      };
      setFuse(new Fuse(columnNamesList, fuseOptions));
    }
    searchMatch(directiveInput);
    setInput(directiveInput);
  }, [directiveInput]);

  const searchMatch = (query: string) => {
    let results = [];
    const input: string = query;
    const spaceIndex = input.indexOf(' ');
    if (fuse && input.length > 0) {
      if (isDirectiveSelected === false) {
        results = fuse
          .search(input)
          .slice(0, 3)
          .filter((row, index) => {
            if (spaceIndex === -1) {
              return true;
            }
            return row.score === 0 && index === 0;
          })
          .map((row) => {
            row.uniqueId = uuidV4();
            return row;
          });
        reverse(results);
      } else {
        results = fuse.search(input.split(':')[1]).map((row) => {
          row.uniqueId = uuidV4();
          return row;
        });
        reverse(results);
      }
    }
    setActiveResults(results);
    setInput(query);
    setActiveSelectionIndex(results.length - 1);
    if (isDirectiveSelected === false) {
      if ((spaceIndex !== -1) === true) {
        getDirectiveUsage(results, true);
      } else {
        getDirectiveUsage(results, false);
      }
    }
  };

  const handleRowClick = (row) => {
    if (typeof onRowClick !== 'function') {
      return;
    }
    let eventObject = {} as IOnRowClickValue;
    if (isDirectiveSelected === false) {
      eventObject = {
        target: { value: `${row.item.directive}` },
      };
      onRowClick(eventObject);
      getDirectiveUsage([row], true);
    } else {
      const splitData = input.split(/(?=[:])|(?<=[:])/g);
      eventObject = {
        target: { value: `${splitData[0]}${splitData[1]}${row.item.label}` },
      };
      setInput(`${splitData[0]}${splitData[1]}${row.item.label}`);
      onRowClick(eventObject);
      onColumnSelected(true);
    }
  };

  return (
    <Box className={classes.listWrapper} >
      {Array.isArray(activeResults) &&
        activeResults.length > 0 &&
        activeResults.map((row, index) => {
          return (
            <Box
              className={
                index === activeSelectionIndex
                  ? `${classes.resultRow} ${classes.activeRow}`
                  : `${classes.resultRow}`
              }
              key={row.uniqueId}
              onClick={() => handleRowClick(row)}
              data-testid="select-directive-list-option"
            >
              <Box>
                <Typography
                  data-testid="select-directive-list-label"
                  className={classes.directiveTitle}
                  variant="body1"
                >
                  {row?.item?.directive || row?.item?.label}
                </Typography>
                <Typography
                  data-testid="select-directive-list-description"
                  className={classes.directiveDescription}
                  variant="body1"
                >
                  {row?.item?.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}
