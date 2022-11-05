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

import { Box } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import SearchRounded from '@material-ui/icons/SearchRounded';
import HeaderSearchInputField from 'components/ConnectionList/Components/HeaderSearchInputField';
import { useStyles } from 'components/ConnectionList/styles';
import { IHeaderSearchProps } from 'components/ConnectionList/types';
import React from 'react';

export default function({
  eachFilteredData,
  index,
  refs,
  makeCursorFocused,
  handleSearch,
  handleClearSearch,
}: IHeaderSearchProps) {
  const classes = useStyles();
  return (
    <Box
      className={
        eachFilteredData.toggleSearch ? classes.afterSearchIconClick : classes.hideComponent
      }
      onMouseOver={() => makeCursorFocused(index)}
    >
      <SearchRounded />
      <HeaderSearchInputField
        refs={refs}
        onChange={handleSearch}
        index={index}
        type="text"
        classnames={classes.searchBar}
      />
      <Box
        className={classes.closeIcon}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => handleClearSearch(e, index)}
      >
        <Close />
      </Box>
    </Box>
  );
}
