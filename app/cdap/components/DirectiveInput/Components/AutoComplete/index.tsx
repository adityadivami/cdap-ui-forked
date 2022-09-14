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

import PropTypes from 'prop-types';

import React, { Component, useEffect, useState } from 'react';
import MyDataPrepApi from 'api/dataprep';
import Fuse from 'fuse.js';
import uuidV4 from 'uuid/v4';
import reverse from 'lodash/reverse';
import Mousetrap from 'mousetrap';
import classnames from 'classnames';
import NamespaceStore from 'services/NamespaceStore';
import ee from 'event-emitter';
import globalEvents from 'services/global-events';
import {useStyles} from './styles';
import { Box } from '@material-ui/core';

const DataPrepAutoComplete = (props) => {
  const [activeResults, setActiveResults] = useState([]);
  const [input, setInput] = useState('');
  const [matched, setMatched] = useState(false);
  const [activeSelectionIndex, setActiveSelectionIndex] = useState(null);
  const eventEmitter = ee(ee);
  const [fuse, setFuse] = useState(null);
  const classes = useStyles();
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
      console.log('res', res);
      setFuse(new Fuse(res.values, fuseOptions));
      console.log('fuse', new Fuse(res.values, fuseOptions));
    });
  };
  eventEmitter.on(globalEvents.DIRECTIVEUPLOAD, getUsage);
  useEffect(() => {
    getUsage();
  }, []);

  useEffect(() => {
    const directiveInput = document.getElementById('directive-input-search');
    const mousetrap = new Mousetrap(directiveInput);
    console.log('mousetrap', mousetrap);
    mousetrap.bind('esc', props.toggle);
    mousetrap.bind('up', handleUpArrow);
    mousetrap.bind('down', handleDownArrow);
    mousetrap.bind('enter', handleEnterKey);
    mousetrap.bind('tab', handleTabKey);
  });
  const handleUpArrow = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
    if (activeSelectionIndex === 0) {
      return;
    }
    setActiveSelectionIndex(activeSelectionIndex - 1);
  };

  const handleDownArrow = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
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

    const inputSplit = input.split(' '),
      directiveSplit = selectedDirective ? selectedDirective.item.directive.split(' ') : [];

    const splitLengthCheck = inputSplit.length < directiveSplit.length,
      stringLengthCheck =
        selectedDirective && input.length <= selectedDirective.item.directive.length;

    if (selectedDirective && (splitLengthCheck || stringLengthCheck)) {
      handleRowClick(activeResults[activeSelectionIndex]);
    } else {
      props?.execute([input]);
    }
  };

  const handleTabKey = (e) => {
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
  useEffect(() => {
    searchMatch(props.input);
    setInput(props.input);
  }, [props.input]);

  const searchMatch = (query) => {
    let results = [];
    let input = query;
    const spaceIndex = input.indexOf(' ');
    if (spaceIndex !== -1) {
      input = input.slice(0, spaceIndex);
    }

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
    }
    setActiveResults(results);
    setInput(query);
    setMatched(spaceIndex !== -1);
    setActiveSelectionIndex(results.length - 1);
  };

  const handleRowClick = (row) => {
    if (typeof props.onRowClick !== 'function') {
      return;
    }

    const eventObject = {
      target: { value: `${row.item.directive} ` },
    };

    props.onRowClick(eventObject);
    props.inputRef.focus();
  };

  console.log('activeResults', activeResults, activeSelectionIndex);

  return (
    <Box className={classes.listWrapper}>
      {activeResults.map((row, index) => {
        return (
          <Box
            className={index === activeSelectionIndex ? `${classes.resultRow} ${classes.activeRow}` : `${classes.resultRow}`}
            key={row.uniqueId}
            onClick={() => handleRowClick(row)}
          >
            <Box className={classes.directiveTitle}>
              <strong>{row.item.directive}</strong>
            </Box>
            <Box className={classes.directiveDescription}>{row.item.description}</Box>

            {matched || activeResults.length === 1 ? (
              <Box className={classes.directiveUsage}>
                <span>Usage: </span>
                <pre>{row.item.usage}</pre>
              </Box>
            ) : null}
          </Box>
        );
      })}
    </Box>
  );
};

export default DataPrepAutoComplete;
