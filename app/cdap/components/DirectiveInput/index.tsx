import React, { useRef, useState } from 'react';
import { Box, Drawer } from '@material-ui/core';
import { CrossIcon } from './iconStore';
import { useStyles } from './styles';
import AutoCompleteList from './Components/AutoComplete';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const DirectiveDrawer = (props) => {
  const [open, setOpen] = useState(true);
  const [directiveInput, setDirectiveInput] = useState('');
  const [autoCompleteOn, setAutoCompleteOn] = useState(false);
  const directiveRef = useRef();
  const classes = useStyles();
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
          //   hasError: PropTypes.any,
          //   execute: PropTypes.func,
        />
        <Box className={classes.searchBar}>
          <Box className={classes.inputWrapper}>
            <label htmlFor="directive-input-search" className={classes.label}>
              $
            </label>
            <input
              type="text"
              id="directive-input-search"
              className={classes.inputSearch}
              placeholder={'Input a directive'}
              value={directiveInput}
              onChange={handleDirectiveChange}
              onPaste={handlePaste}
              ref={directiveRef}
              //   disabled={this.props.disabled}
            />
          </Box>
          {CrossIcon}
        </Box>
      </Drawer>
    </div>
  );
};

export default DirectiveDrawer;
