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

import { Box, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MyDataPrepApi from 'api/dataprep';
import React, { useEffect, useRef, useState } from 'react';
import NamespaceStore from 'services/NamespaceStore';
import { useStyles } from './styles';

export default function({ transformationPanel }) {
  const classes = useStyles();
  const [searchResults, setSeachResults] = useState([]);
  const [displayRecentSearches, setDisplayRecentSearches] = useState(false);
  const [textFieldInput, setTextFieldInput] = useState('');
  const [selectedDirective, setSelectedDirective] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const textInput = useRef(null);

  const getData = () => {
    const namespace = NamespaceStore.getState().selectedNamespace;
    MyDataPrepApi.getUsage({ context: namespace }).subscribe((res) => {
      setSeachResults([...res.values]);
    });
  };

  const handleInputChange = (e) => {
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

  useEffect(() => {
    getData();
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
    return <Paper elevation={0} {...props} className={classes.root} />;
  };

  const handleOptionClick = (selectedOption) => {
    setTextFieldInput(null);
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
    setSeachResults([]);
  };

  return (
    <Box className={classes.main}>
      <Autocomplete
        id="combo-box-demo"
        options={displayRecentSearches ? recentSearches : searchResults}
        getOptionLabel={(option) =>
          searchResults.length ? option.directive.concat(`(${option.description})`) : ''
        }
        autoHighlight={true}
        PaperComponent={CustomPaper}
        onClose={handleClose}
        classes={{
          option: classes.optionInMUIAutocomplete,
          focused: classes.onFocusAutocomplete,
          input: classes.onBlurAutocomplete,
        }}
        renderOption={(option) => (
          <>
            <Box
              className={classes.suggestions}
              key={option.directive}
              onClick={() => handleOptionClick(option)}
              role="button"
            >
              <Box className={classes.content}>
                <Typography variant="body1" className={classes.directive}>
                  {option.directive}
                </Typography>
                <Box className={classes.navigate}>
                  <Typography variant="body1" className={classes.description}>
                    {option.description}
                  </Typography>
                  <Box>
                    <ChevronRightRoundedIcon className={classes.chevron} />
                  </Box>
                </Box>
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
            classes={{ root: classes.customTextField }}
            inputRef={textInput}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <div>
                      <SearchOutlinedIcon className={classes.search} />
                    </div>
                  </InputAdornment>
                  <></>
                </>
              ),
              endAdornment: (
                <>
                  <InputAdornment position="end">
                    {textInput?.current?.value && (
                      <div>
                        <ClearOutlinedIcon
                          className={classes.close}
                          onClick={() => {
                            textInput.current.value = '';
                          }}
                        />
                      </div>
                    )}
                  </InputAdornment>
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}
