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

import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import Mousetrap from 'mousetrap';
import NamespaceStore from 'services/NamespaceStore';
import MyDataPrepApi from 'api/dataprep';
import Fuse from 'fuse.js';
import reverse from 'lodash/reverse';
import uuidV4 from 'uuid/v4';
import classnames from 'classnames';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const DirectivesAutocomplete = ({ directiveInput, onRowClick, toggle, isOpen, hasError }) => {
  const classes = useStyles();

  const [activeResults, setActiveResults] = useState([]);
  const [input, setInput] = useState('');
  const [matched, setMatched] = useState(false);
  const [activeSelectionIndex, setActiveSelectionIndex] = useState(0);
  const [fuse, setFuse] = useState<any>();

  const getUsage = () => {
    const namespace = NamespaceStore.getState().selectedNamespace;
    MyDataPrepApi.getUsage({ context: namespace }).subscribe((res) => {
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
        keys: ['directive'],
      };
      const curFuse = new Fuse(res.values, fuseOptions);
      setFuse(curFuse);
    });
  };
  useEffect(() => {
    getUsage();
  }, []);
  useEffect(() => {
    if (directiveInput != input) {
      searchMatch(directiveInput);
    }
    if (directiveInput === '') {
      return;
    }
  }, [directiveInput]);

  const handleRowClick = (row) => {
    if (typeof onRowClick !== 'function') {
      return;
    }
    const eventObject = {
      target: { value: `${row.item.directive} ` },
    };
    onRowClick(eventObject);
  };

  const handleUpArrow = (e) => {
    console.log('activeSelectionIndex inside Up', activeSelectionIndex);
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
    if (activeSelectionIndex === 0) {
      return;
    }

    setActiveSelectionIndex((prev: any) => prev - 1);
  };

  const handleDownArrow = (e) => {
    console.log('activeSelectionIndex Inside Down', activeSelectionIndex);
    e.preventDefault();
    if (activeSelectionIndex === activeResults.length + 1) {
      return;
    }

    setActiveSelectionIndex(activeSelectionIndex + 1);
  };

  useEffect(() => {
    console.log('activeSelectionIndex', activeSelectionIndex);
  }, [activeSelectionIndex]);

  const handleEnterKey = () => {
    if (input.length === 0) {
      return;
    }
    const selectedDirective = activeResults[activeSelectionIndex];
    const inputSplit = input.split(' '),
      directiveSplit = selectedDirective ? selectedDirective.item.directive.split(' ') : [];
    const splitLengthCheck = inputSplit.length < directiveSplit.length,
      stringLengthCheck =
        selectedDirective && input.length <= selectedDirective.item.directive.length;

    if (selectedDirective && (splitLengthCheck || stringLengthCheck)) {
      handleRowClick(activeResults[activeSelectionIndex]);
    } else {
      // execute([input]);
    }
  };

  const handleTabKey = (e) => {
    console.log('tab');
    if (input.length === 0 || input.split(' ').length !== 1) {
      return;
    }

    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }

    handleEnterKey();
  };

  const searchMatch = (query) => {
    setInput(query);
    let results = [];
    let input = query;
    const spaceIndex = input.indexOf(' ');
    if (spaceIndex !== -1) {
      input = input.slice(0, spaceIndex);
    }

    // Currently only showing 3 matches.

    if (fuse && input.length > 0) {
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
      setActiveResults(results);
      setMatched(spaceIndex !== -1);
      setActiveSelectionIndex(results.length - 1);
    }
  };
  useEffect(() => {
    console.warn(activeSelectionIndex, 'active');
    const directiveInput = document.getElementById('directive-input');
    const mousetrap = new Mousetrap(directiveInput);
    mousetrap.bind('esc', toggle);
    mousetrap.bind('up', handleUpArrow);
    mousetrap.bind('down', handleDownArrow);
    mousetrap.bind('enter', handleEnterKey);
    mousetrap.bind('tab', handleTabKey);
  }, []);

  if (isOpen) {
    return (
      <Box>
        {activeResults.map((row, index) => {
          return (
            <Box>
              {!(matched || activeResults.length === 1) ? (
                <Box
                  className={classnames(`${classes.container}`, {
                    active: index === activeSelectionIndex,
                  })}
                  onClick={handleRowClick}
                  role="button"
                  key={row.uniqueId}
                >
                  <Box className={classes.resultRow}>
                    <Box className={classes.suggestions}>
                      <Box className={classes.directiveTitle}>{row.item.directive}</Box>
                      <Box className={classes.directiveDescription}>{row.item.description}</Box>
                    </Box>
                  </Box>
                </Box>
              ) : null}

              {matched || activeResults.length === 1 ? (
                <Box className={classes.directiveUsage}>
                  <Box className={classes.directiveUsageWithBorder}>
                    <Typography className={classes.usage}>Usage:{row.item.usage} </Typography>
                    <Box className={classes.info}>
                      <InfoOutlinedIcon className={classes.infoIcon} />
                      <Typography className={classes.infoText}>
                        More info on this directive{' '}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Box>
          );
        })}
      </Box>
    );
  } else {
    return <Box className={classes.empty} />;
  }
};

export default DirectivesAutocomplete;
