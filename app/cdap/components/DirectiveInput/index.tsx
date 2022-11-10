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

import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Divider } from '@material-ui/core';
import { CrossIcon, InfoIcon } from 'components/DirectiveInput/iconStore';
import { useStyles } from 'components/DirectiveInput/styles';
import AutoCompleteList from 'components/DirectiveInput/Components/AutoComplete';
import Fuse from 'fuse.js';
import uuidV4 from 'uuid/v4';
import { moreInfoOnDirective } from 'components/DirectiveInput/constants';
import T from 'i18n-react';
import { IDirectiveInputProps, IOnRowClickValue } from 'components/DirectiveInput/types';

export default function({
  columnNamesList,
  onDirectiveInputHandler,
  onClose,
  openDirectivePanel,
}: IDirectiveInputProps) {
  const [directiveInput, setDirectiveInput] = useState<string>('');
  const [isColumnSelected, setIsColumnSelected] = useState<boolean>(false);
  const [isDirectiveSelected, setIsDirectiveSelected] = useState<boolean>(false);
  const [usageDirective, setUsageDirective] = useState([]);
  const directiveRef = useRef();
  const classes = useStyles();
  const [directivesList, setDirectivesList] = useState([]);

  const handleDirectiveChange = (event: IOnRowClickValue | React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setIsDirectiveSelected(false);
    }
    setDirectiveInput(event.target.value);
  };

  useEffect(() => {
    const inputSplit: string[] = directiveInput.replace(/^\s+/g, '').split(' ');
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
    const fuse = new Fuse(directivesList, fuseOptions);
    const results = fuse.search(inputSplit[0]).map((row) => {
      row.uniqueId = uuidV4();
      return row;
    });
    setUsageDirective(results);
  }, [directiveInput]);

  const handlePasteDirective = () => {
    const inputSplit = directiveInput.replace(/^\s+/g, '').split(' ');
    const filterUsageItem =
      directivesList.length > 0
        ? directivesList.filter((el) => el.usage.includes(inputSplit[0]))
        : [];
    const usageArraySplit = filterUsageItem.length > 0 ? filterUsageItem[0].usage.split(' ') : [];
    if (
      usageArraySplit.length === inputSplit.length ||
      inputSplit.length > usageArraySplit.length
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    {
      const usageArraySplit =
        usageDirective.length > 0 ? usageDirective[0]?.item?.usage.split(' ') : [];
      const inputSplit = directiveInput.replace(/^\s+/g, '').split(' ');
      if (event.key === 'Enter' && handlePasteDirective()) {
        onDirectiveInputHandler(directiveInput);
      } else if (
        event.key === 'Enter' &&
        isColumnSelected &&
        isDirectiveSelected &&
        (usageArraySplit.length === inputSplit.length || inputSplit.length > usageArraySplit.length)
      ) {
        onDirectiveInputHandler(directiveInput);
      }
    }
  };

  return (
    <>
      {openDirectivePanel && (
        <Box data-testid='directive-input-parent'>
          <AutoCompleteList
            directiveInput={directiveInput}
            onRowClick={(eventObject) => handleDirectiveChange(eventObject)}
            setDirectivesList={setDirectivesList}
            getDirectiveUsage={(activeResults, value) => {
              setIsDirectiveSelected(value);
              setUsageDirective(activeResults);
            }}
            onColumnSelected={() => {
              setIsColumnSelected(true);
            }}
            isDirectiveSelected={isDirectiveSelected}
            columnNamesList={columnNamesList}
          />
          <Box className={classes.usageAndSearchWrapper}>
            {Array.isArray(usageDirective) && usageDirective.length === 1 ? (
              usageDirective.map((row) => {
                return (
                  <Box className={classes.directiveUsage}>
                    <Typography className={classes.usageText} variant="body1" data-testid='directive-usage-text'>
                      {T.translate('features.WranglerNewUI.GridPage.directivePanel.usage')}:&nbsp;
                      {row?.item?.usage || row?.usage} &nbsp; &nbsp;
                      {moreInfoOnDirective[row?.item?.directive] && (
                        <a
                          href={`${moreInfoOnDirective[row?.item?.directive]}`}
                          className={classes.infoLink}
                          target="_blank"
                        >
                          {InfoIcon} &nbsp;
                          {T.translate(
                            'features.WranglerNewUI.GridPage.directivePanel.moreInfoOnDirective'
                          )}
                        </a>
                      )}
                    </Typography>
                    <Divider classes={{ root: classes.divider }} />
                  </Box>
                );
              })
            ) : (
              <></>
            )}
            <Box className={classes.searchBar}>
              <Box className={classes.inputWrapper}>
                <label
                  htmlFor="directive-input-search"
                  data-testid="select-directive-input-label"
                  className={classes.label}
                >
                  {T.translate('features.WranglerNewUI.GridPage.directivePanel.dollar')}
                </label>
                <input
                  id="directive-input-search"
                  autoComplete="OFF"
                  className={classes.inputSearch}
                  placeholder={'Input a directive'}
                  value={directiveInput}
                  onChange={handleDirectiveChange}
                  ref={directiveRef}
                  onKeyDown={onEnterClick}
                  data-testid="select-directive-input-search"
                />
              </Box>
              <Box
                className={classes.crossIcon}
                data-testid="close-directive-panel"
                onClick={() => onClose()}
              >
                {CrossIcon}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
