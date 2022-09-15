import React, { useRef, useState } from 'react';
import { Box, Drawer, Typography, Divider } from '@material-ui/core';
import { CrossIcon } from './iconStore';
import { useStyles } from './styles';
import AutoCompleteList from './Components/AutoComplete';
import DataPrepStore from 'components/DataPrep/store';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const DirectiveDrawer = (props) => {
  const [open, setOpen] = useState(true);
  const [directiveInput, setDirectiveInput] = useState('');
  const [autoCompleteOn, setAutoCompleteOn] = useState(false);
  const [onDirectiveSelection, setOnDirectiveSelection] = useState({
    isDirectiveSelected: false,
    activeResults: [],
  });
  const directiveRef = useRef();
  const classes = useStyles();
  const { dataprep } = DataPrepStore.getState();
  console.log('dataprep', dataprep.directives);
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

    setOpen(false);
  };

  const handleDirectiveChange = (event) => {
    setDirectiveInput(event.target.value);
    setAutoCompleteOn(true);
  };

  const handlePaste = (e) => {
    let data = e.clipboardData.getData('Text');
    data = data.split('\n').filter((row) => {
      // filter out empty rows
      return row.trim().length > 0;
    });

    if (data.length > 1) {
      e.preventDefault();
      // this.execute(data);
    }
  };

  const toggleAutoComplete = () => {
    setAutoCompleteOn(!autoCompleteOn);
  };

  return (
    <div>
      <Drawer anchor={'bottom'} open={open} onClose={toggleDrawer('bottom', false)}>
        <AutoCompleteList
          isOpen={autoCompleteOn}
          toggle={toggleAutoComplete}
          input={directiveInput}
          onRowClick={handleDirectiveChange}
          inputRef={directiveRef}
          getDirectiveUsage={(activeResults, value) => {
            setOnDirectiveSelection({
              isDirectiveSelected: value,
              activeResults,
            });
          }}
          isDirectiveSelected={onDirectiveSelection.isDirectiveSelected}
          columnNamesList={props.columnNamesList}
          onDirectiveInputHandler={(value) => {
            console.log('value', value);
          }}
        />
        <Box className={classes.usageAndSearchWrapper}>
          {onDirectiveSelection.activeResults.length === 1
            ? onDirectiveSelection.activeResults.map((row) => {
                return (
                  <Box className={classes.directiveUsage}>
                    <Typography className={classes.usageText} variant="body1">
                      Usage:&nbsp; {row.item.usage}
                    </Typography>
                    <Divider />
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
                className={classes.inputSearch}
                placeholder={'Input a directive'}
                value={directiveInput}
                onChange={handleDirectiveChange}
                ref={directiveRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    props.onDirectiveInputHandler([directiveInput]);
                  }
                }}
                //   disabled={this.props.disabled}
              />
            </Box>
            <Box onClick={() => props.onClose()}>{CrossIcon}</Box>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default DirectiveDrawer;
