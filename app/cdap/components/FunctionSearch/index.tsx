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
import MyDataPrepApi from 'api/dataprep';
import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import NamespaceStore from 'services/NamespaceStore';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

const FunctionSearch = ({ transformationPanel }) => {
  const classes = useStyles();
  const [searchResults, setSeachResults] = useState([]);
  const [displayRecentSearches, setDisplayRecentSearches] = useState(false);
  const [textFieldInput, setTextFieldInput] = useState('');
  const [selectedDirective, setSelectedDirective] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  // const textInput = React.useRef(null);
  let functionsList;

  const GetData = () => {
    const namespace = NamespaceStore.getState().selectedNamespace;
    MyDataPrepApi.getUsage({ context: namespace }).subscribe((res) => {
      functionsList = [...res.values];
      setSeachResults(functionsList);
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
    GetData();
    if (textFieldInput === '') {
      setDisplayRecentSearches(true);
    }
  }, [textFieldInput]);

  useEffect(() => {
    if (textFieldInput === '') {
      setDisplayRecentSearches(true);
    } else {
      setDisplayRecentSearches(false);
    }
  }, [textFieldInput]);

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
  };

  const clearSearchHandler = () => {
    // textInput.current.value = '';
    setTextFieldInput(null);
    setDisplayRecentSearches(true);
  };

  console.log(textFieldInput, 'textFieldInput');
  // console.log(textInput, 'textInput');
  const CustomPaper = (props) => {
    return (
      <Box>
        {recentSearches.length > 0 && displayRecentSearches && (
          <Box className={classes.searchResultHeadBox}>
            <div className={classes.headingTextStyles}>Recent Results</div>
            <img src="/cdap_assets/img/Underline.svg" alt="header line" />
          </Box>
        )}
        {searchResults.length > 0 && textFieldInput?.length > 0 && (
          <Box className={classes.searchResultHeadBox}>
            <div className={classes.headingTextStyles}>Search Results</div>
            <img src="/cdap_assets/img/Underline.svg" alt="header line" />
          </Box>
        )}
        <Paper elevation={0} {...props} className={classes.root} />
      </Box>
    );
  };

  return (
    <Box className={classes.main}>
      <Autocomplete
        options={displayRecentSearches ? recentSearches : searchResults}
        getOptionLabel={(option) =>
          searchResults.length ? option.directive.concat(`(${option.description})`) : ''
        }
        autoHighlight={true}
        PaperComponent={CustomPaper}
        onClose={handleClose}
        selectOnFocus
        clearOnBlur
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
            classes={{ root: classes.customTextField }}
            // inputRef={textInput}
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
                    {textFieldInput?.length > 0 && (
                      <div>
                        <ClearOutlinedIcon
                          className={classes.close}
                          onClick={() => setTextFieldInput('')}
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
};
export default FunctionSearch;
