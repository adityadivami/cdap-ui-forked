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

import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    functionSectionStyles: {
      padding: '15px 0',
      borderBottom: '1px solid #DADCE0',
    },
    funtionSectionWrapperStyles: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    functionHeadingTextStyles: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
    },
    greenCheckIconStyles: {
      width: '20px',
      height: '20px',
    },
    radioStyles: {
      marginLeft: '-5px',
      '& span:last-child': {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        color: '#5F6368',
      },
    },
    checkboxStyles: {
      display: 'flex',
      width: '100%',
      marginBottom: 0,
    },
    formFieldStyles: {
      width: 'calc(100% - 60px)',
      marginRight: '60px',
      border: '1px solid #DADCE0',
      height: '40px',
      padding: '5px 15px',
      fontSize: '14px',
      background: '#FFFFFF',
      borderRadius: '4px',
      marginLeft: 0,
    },
    underlineStyles: {
      width: '100%',
      '&:before': {
        border: 'none',
      },
      '&:hover:not(.Mui-disabled):before': {
        border: 'none',
      },
      '&:after': {
        border: 'none',
      },
      '&.MuiInput-underline.Mui-disabled:before': {
        borderBottomStyle: 'unset',
      },
    },
    inputStyles: {
      width: '100%',
      '&:focus': {
        outline: 'none',
      },
    },
    formGroupStyles: {
      width: 'calc(100% - 60px)',
    },
    formLabelStyles: {
      color: '#5F6368',
      fontSize: '14px',
      fontStyle: 'normal',
      marginTop: '10px',
      fontWeight: 400,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      marginBottom: '10px',
    },
    selectBootstrapInput: {
      width: '87%',
      marginLeft: '11px',
    },
    additionalText: {
      color: '#5F6368',
      fontSize: '12px',
    },
    calculateFlex: {
      display: 'flex',
      width: '100%',
    },
    calculateWrapper: {
      marginTop: 20,
    },
    signText: {
      marginRight: 10,
    },
    exchangeIcon: {
      width: '30px',
      margin: '0 auto',
      cursor: 'pointer',
    },
    labelTextStyles: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
    },
    muiFormGroupRootInput: {
      width: '100%',
    },
    errorText: {
      fontSize: 13,
    },
    selectFormGroup: {
      width: 'calc(100% - 60px)',
      marginRight: '60px',
      border: '1px solid #DADCE0',
      height: '40px',
      padding: '5px 15px',
      fontSize: '14px',
      background: '#FFFFFF',
      borderRadius: '4px',
      marginLeft: 0,
      marginBottom: 5,
    },
    selectInputRoot: {
      color: '#5F6368',
      '&:before': {
        border: 'none',
      },
    },
    menuItemText: {
      color: '#5F6368',
    },
    popoverBox: {
      padding: 10,
    },
    popoverHead: {
      fontSize: 16,
      borderBottom: '1px solid #E0E0E0',
      color: '#5F6368',
      marginBottom: 5,
      fontWeight: 600,
    },
    popoverText: {
      fontSize: 14,
      color: '#5F6368',
      fontWeight: 400,
    },
    applyStepButtonStyles: {
      width: '162px',
      height: '36px',
      background: '#3994FF',
      boxShadow: '0px 2px 4px rgba(70, 129, 244, 0.15)',
      borderRadius: '4px',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '26px',
      letterSpacing: '0.46px',
      color: '#FFFFFF',
      alignSelf: 'flex-end',
      marginTop: '30px',
      textTransform: 'none',
      marginBottom: '20px',
      '&:hover': {
        backgroundColor: '#3994FF',
      },
    },
    extractPositionButtonGroup: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});
