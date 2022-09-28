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
import { useStyles } from './styles';
import { Box, Divider, Typography } from '@material-ui/core';
import { query } from 'express';

const DataPrepAutoComplete = ({ setDirectivesList, ...props }) => {
  const [activeResults, setActiveResults] = useState([]);
  const [input, setInput] = useState('');
  const [matched, setMatched] = useState(false);
  const [activeSelectionIndex, setActiveSelectionIndex] = useState(null);
  const eventEmitter = ee(ee);
  const [fuse, setFuse] = useState(null);
  const classes = useStyles();
  const getUsage = () => {
    if (props.isDirectiveSelected === false) {
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
        console.log(res.values);
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
      setFuse(new Fuse(props.columnNamesList, fuseOptions));
    }
  };

  useEffect(() => {
    getUsage();
  }, [props.isDirectiveSelected]);

  useEffect(() => {
    eventEmitter.on(globalEvents.DIRECTIVEUPLOAD, getUsage);
    const directiveInput = document.getElementById('directive-input-search');
    const mousetrap = new Mousetrap(directiveInput);
    mousetrap.bind('esc', props.toggle);
    mousetrap.bind('up', handleUpArrow);
    mousetrap.bind('down', handleDownArrow);
    mousetrap.bind('enter', handleEnterKey);
    mousetrap.bind('tab', handleTabKey);

    // returned function will be called on component unmount
    return () => {
      mousetrap.unbind('esc');
      mousetrap.unbind('up');
      mousetrap.unbind('down');
      mousetrap.unbind('enter');
      mousetrap.unbind('tab');
      eventEmitter.off(globalEvents.DIRECTIVEUPLOAD, getUsage);
    };
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
  console.log('activeSelectionIndex', activeSelectionIndex);
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
      props.onRowClick(eventObject);
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
    if (
      (props.isDirectiveSelected === true || props.isDirectiveSelected == undefined) &&
      props.isDirectiveSelected !== false
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
      setFuse(new Fuse(props.columnNamesList, fuseOptions));
    }
    searchMatch(props.input);
    setInput(props.input);
  }, [props.input]);

  const searchMatch = (query) => {
    let results = [];
    const input = query;
    const spaceIndex = input.indexOf(' ');
    if (fuse && input.length > 0) {
      if (props.isDirectiveSelected === false) {
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
    setMatched(spaceIndex !== -1);
    setActiveSelectionIndex(results.length - 1);
    if (props.isDirectiveSelected === false) {
      if ((spaceIndex !== -1) === true) {
        props.getDirectiveUsage(results, true);
      } else {
        props.getDirectiveUsage(results, false);
      }
    }
  };

  const handleRowClick = (row) => {
    if (typeof props.onRowClick !== 'function') {
      return;
    }
    let eventObject = {};
    if (props.isDirectiveSelected === false) {
      eventObject = {
        target: { value: `${row.item.directive} ` },
      };
      props.onRowClick(eventObject);
      props.getDirectiveUsage([row], true);
      props.inputRef.focus();
    } else {
      const splitData = input.split(/(?=[:])|(?<=[:])/g);
      eventObject = {
        target: { value: `${splitData[0]}${splitData[1]}${row.item.label}` },
      };
      setInput(`${splitData[0]}${splitData[1]}${row.item.label}`);
      props.onRowClick(eventObject);
      props.onColumnSelected(true);
    }
  };

  console.log('activeResults', activeResults);
  return (
    <Box className={classes.listWrapper}>
      {activeResults.map((row, index) => {
        return (
          <Box
            className={
              index === activeSelectionIndex
                ? `${classes.resultRow} ${classes.activeRow}`
                : `${classes.resultRow}`
            }
            key={row.uniqueId}
            onClick={() => handleRowClick(row)}
          >
            <Box>
              <Typography className={classes.directiveTitle} variant="body1">
                {row.item.directive || row.item.label}
              </Typography>
              <Typography className={classes.directiveDescription} variant="body1">
                {row.item.description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default DataPrepAutoComplete;
