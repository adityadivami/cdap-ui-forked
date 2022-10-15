import React, { useRef, useState } from 'react';
import { Box, Drawer, Typography, Divider } from '@material-ui/core';
import { CrossIcon } from './iconStore';
import { useStyles } from './styles';
import AutoCompleteList from './Components/AutoComplete';
import DataPrepStore from 'components/DataPrep/store';
import { isDirective } from 'graphql';

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
    console.log('inputSplit', inputSplit, usageArraySplit, filterUsageItem);
    if (
      usageArraySplit.length === inputSplit.length ||
      inputSplit.length > usageArraySplit.length
    ) {
      console.log('inputSplit', true);
      return true;
    } else {
      console.log('inputSplit', false);
      return false;
    }
  };

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
          }}
          onColumnSelected={(value) => {
            setIsColumnSelected(true);
          }}
          usageArray={onDirectiveSelection.activeResults}
          isDirectiveSelected={onDirectiveSelection.isDirectiveSelected}
          isColumnSelected={isColumnSelected}
          columnNamesList={props.columnNamesList}
        />
        <Box className={classes.usageAndSearchWrapper}>
          {onDirectiveSelection.activeResults.length === 1
            ? onDirectiveSelection.activeResults.map((row) => {
                return (
                  <Box className={classes.directiveUsage}>
                    <Typography className={classes.usageText} variant="body1">
                      Usage:&nbsp; {row.item.usage}
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
