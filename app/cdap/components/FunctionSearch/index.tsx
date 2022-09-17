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

import { Box, Paper, TextField, Typography } from '@material-ui/core';
import MyDataPrepApi from 'api/dataprep';
import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import NamespaceStore from 'services/NamespaceStore';
import Autocomplete from '@material-ui/lab/Autocomplete';

const FunctionSearch = () => {
  const classes = useStyles();
  const [searchResults, setSeachResults] = useState([]);
  const [displayRecentSearches, setDisplayRecentSearches] = useState(false);
  const [textFieldInput, setTextFieldInput] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const GetData = () => {
    const namespace = NamespaceStore.getState().selectedNamespace;
    MyDataPrepApi.getUsage({ context: namespace }).subscribe((res) => {
      setSeachResults(res.values);
    });
  };

  const handleInputChange = (e) => {
    if (e.target.value == '') {
      setDisplayRecentSearches(true);
    } else {
      setDisplayRecentSearches(false);
    }
  };

  const handleClose = () => {
    setDisplayRecentSearches(true);
  };
  useEffect(() => {
    GetData();
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
    return <Paper elevation={8} {...props} classes={classes.autoComplete} />;
  };

  const handleOptionClick = (selectedOption) => {
    const currentRecentSearch = selectedOption;
    const array = [...recentSearches];
    if (recentSearches.length > 4) {
      // remove the last element
      array.splice(-1);
      setRecentSearches([currentRecentSearch, ...array]);
    } else {
      setRecentSearches([currentRecentSearch, ...array]);
    }
    if (textFieldInput === '') {
      setDisplayRecentSearches(false);
    }
  };

  return (
    <Box>
      <Autocomplete
        id="combo-box-demo"
        options={displayRecentSearches ? recentSearches : searchResults}
        getOptionLabel={(option) => option.directive.concat(`(${option.description})`)}
        autoHighlight={true}
        PaperComponent={CustomPaper}
        style={{ height: '555px' }}
        onClose={handleClose}
        renderOption={(option) => (
          <>
            <Box
              className={classes.suggestions}
              key={option.directive}
              onClick={() => handleOptionClick(option)}
              role="button"
            >
              <Box className={classes.content}>
                {option.directive}
                <br />
                {option.description}
              </Box>
            </Box>
          </>
        )}
        renderInput={(params) => (
          <TextField
            placeholder="Input a function name or description"
            {...params}
            variant="outlined"
            className={classes.textField}
            onChange={(e) => handleInputChange(e)}
            value={textFieldInput}
            id="text-input"
          />
        )}
      />
    </Box>
  );
};
export default FunctionSearch;
