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

import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  main: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '0px',
      '&:hover': {
        outline: 'none !important',
      },
    },
    '& button.MuiAutocomplete-popupIndicator.MuiButtonBase-root.MuiIconButton-root': {
      display: 'none',
    },
    '& div.MuiAutocomplete-endAdornment': {
      paddingRight: '7px',
    },
  },
  root: {
    border: '1px solid #DADCE0',
    borderTop: 'none',
    borderRadius: '0',

    '& MuiAutocomplete-noOptions': {
      padding: '0px',
      margin: '0px',
      borderRadius: '0',
    },
    '& ul#combo-box-demo-popup.MuiAutocomplete-listbox': {
      padding: '0px',
      margin: '0px',
      background: 'white',
      borderRadius: '0px',
      boxShadow: 'inset 3px 4px 15px rgba(68, 132, 245, 0.15);',
    },

    '& div.MuiAutocomplete-noOptions': {
      background: 'white',
    },
  },
  customTextField: {
    '& input::placeholder': {
      fontSize: '14px',
    },
  },
  autoComplete: {
    maxWidth: '490px',
    border: '1px solid #DADCE0',
    borderRadius: '0px',
  },
  textField: {
    height: '48px',
    width: '490px',
    right: '6px',
    marginLeft: '5px',
    boxShadow: '3px 4px 15px rgba(68, 132, 245, 0.15)',
    '& .MuiOutlinedInput-root': {
      borderRadius: '0px',
      '& fieldset': {
        border: '1px solid #DADCE0 !important',
      },
      '&:hover': {
        border: '0px solid #DADCE0 !important',
        outline: 0,
      },
      padding: '8px !important',
    },

    '&:focus-visble': {
      border: '10px solid red',
    },
    '& MuiInputBase-root.MuiOutlinedInput-root.MuiAutocomplete-inputRoot.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-adornedEnd.MuiOutlinedInput-adornedEnd': {
      '&:hover': {
        border: '10px solid red !important',
        outline: 0,
      },
    },
  },

  suggestions: {
    borderBottom: '1px solid #E0E0E0',
    width: '450px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    height: '71px',
  },
  content: {
    padding: '15px 10px',
  },
  directive: {
    color: '#212121',
  },
  description: {
    color: '#616161',
    width: '400px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  navigate: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  chevron: {
    color: '#616161',
    fontSize: 'large',
  },
  search: {
    color: '#757575',
    fontSize: 'xx-large',
  },
  optionInMUIAutocomplete: {
    height: '71px',
  },
  listboxInMuiAutocomplete: {
    height: '1000px !important',
  },
});
