import React, { useEffect, useRef, useState } from 'react';
import { Box, Drawer, Typography, Divider, Link } from '@material-ui/core';
import { CrossIcon, InfoIcon } from './iconStore';
import { useStyles } from './styles';
import AutoCompleteList from './Components/AutoComplete';
import Fuse from 'fuse.js';
import uuidV4 from 'uuid/v4';
import { moreInfoOnDirective } from './constants';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const DirectiveDrawer = (props) => {
  const [open, setOpen] = useState(true);
  const [directiveInput, setDirectiveInput] = useState('');
  const [autoCompleteOn, setAutoCompleteOn] = useState(false);
  const [isColumnSelected, setIsColumnSelected] = useState(false);
  const [onDirectiveSelection, setOnDirectiveSelection] = useState({
    isDirectiveSelected: false,
    activeResults: [],
  });
  const [usageDirective, setUsageDirective] = useState([]);
  const directiveRef = useRef();
  const classes = useStyles();
  const [directivesList, setDirectivesList] = useState([]);
  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    props.onClose();
    setOpen(false);
  };

  const handleDirectiveChange = (event) => {
    if (!event.target.value) {
      setOnDirectiveSelection({
        isDirectiveSelected: false,
        activeResults: [],
      });
    }
    setDirectiveInput(event.target.value);
    setAutoCompleteOn(true);
  };

  const toggleAutoComplete = () => {
    setAutoCompleteOn(!autoCompleteOn);
  };

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

  useEffect(() => {
    const inputSplit = directiveInput.replace(/^\s+/g, '').split(' ');
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

  return (
    <div>
      <Drawer anchor={'bottom'} open={open} onClose={toggleDrawer('bottom', false)}>
        <AutoCompleteList
          isOpen={autoCompleteOn}
          toggle={toggleAutoComplete}
          input={directiveInput}
          onRowClick={(eventObject) => handleDirectiveChange(eventObject)}
          inputRef={directiveRef}
          setDirectivesList={setDirectivesList}
          getDirectiveUsage={(activeResults, value) => {
            setOnDirectiveSelection({
              isDirectiveSelected: value,
              activeResults,
            });
            setUsageDirective(activeResults);
          }}
          onColumnSelected={(value) => {
            setIsColumnSelected(true);
          }}
          usageArray={usageDirective}
          isDirectiveSelected={onDirectiveSelection.isDirectiveSelected}
          isColumnSelected={isColumnSelected}
          columnNamesList={props.columnNamesList}
        />
        <Box className={classes.usageAndSearchWrapper}>
          {usageDirective.length === 1
            ? usageDirective.map((row) => {
                return (
                  <Box className={classes.directiveUsage}>
                    <Typography className={classes.usageText} variant="body1">
                      Usage:&nbsp; {row?.item?.usage || row?.usage} &nbsp; &nbsp;
                      {moreInfoOnDirective[row?.item?.directive] && (
                        <a
                          href={`${moreInfoOnDirective[row?.item?.directive]}`}
                          className={classes.infoLink}
                          target="_blank"
                        >
                          {InfoIcon} &nbsp;More info to this directive
                        </a>
                      )}
                    </Typography>
                    <Divider classes={{ root: classes.divider }} />
                  </Box>
                );
              })
            : null}
          <Box className={classes.searchBar}>
            <Box className={classes.inputWrapper}>
              <label htmlFor="directive-input-search" className={classes.label}>
                $
              </label>
              <input
                id="directive-input-search"
                autoComplete="OFF"
                className={classes.inputSearch}
                placeholder={'Input a directive'}
                value={directiveInput}
                onChange={handleDirectiveChange}
                ref={directiveRef}
                onKeyDown={(e) => {
                  const usageArraySplit =
                    onDirectiveSelection.activeResults.length > 0
                      ? onDirectiveSelection.activeResults[0]?.item?.usage.split(' ')
                      : [];
                  const inputSplit = directiveInput.replace(/^\s+/g, '').split(' ');
                  if (e.key === 'Enter' && handlePasteDirective()) {
                    props.onDirectiveInputHandler([directiveInput]);
                  } else if (
                    e.key === 'Enter' &&
                    isColumnSelected &&
                    onDirectiveSelection.isDirectiveSelected &&
                    (usageArraySplit.length === inputSplit.length ||
                      inputSplit.length > usageArraySplit.length)
                  ) {
                    props.onDirectiveInputHandler([directiveInput]);
                  }
                }}
              />
            </Box>
            <Box className={classes.crossIcon} onClick={() => props.onClose()}>
              {CrossIcon}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default DirectiveDrawer;
