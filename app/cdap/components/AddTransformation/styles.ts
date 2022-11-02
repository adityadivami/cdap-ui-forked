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
import { blue } from '@material-ui/core/colors';
export const useStyles = makeStyles(() => {
  return {
    addTransformationBodyStyles: {
      height: 'calc(100% - 100px)',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
    },
    addTransformationBodyWrapperStyles: {
      height: 'calc(100% - 40px)',
      overflowY: 'auto',
    },
    columnsCountTextStyles: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
      paddingTop: 5,
      paddingBottom: 15,
    },
    functionSectionStyles: {
      padding: '15px 0',
      borderBottom: '1px solid #DADCE0',
    },
    funtionSectionWrapperStyles: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    functionHeadingTextStyles: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
    },
    functionInfoSectionStyles: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    functionTextStyles: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
    },
    infoIconTextStyles: {
      marginLeft: 5,
      width: 20,
      height: 20,
    },
    greenCheckIconStyles: {
      width: 20,
      height: 20,
      marginRight: 5,
    },
    selectedColumnTickIcon: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
      justifyContent: 'space-between',
    },
    quickSelectTextStyles: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
      marginTop: 10,
    },
    selectButtonStyles: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 15,
      lineHeight: '26px',
      letterSpacing: '0.46px',
      color: '#4681F4;',
      textTransform: 'none',
      marginTop: 15,
    },
    applyStepButtonStyles: {
      width: 162,
      height: 36,
      background: '#3994FF',
      boxShadow: '0px 2px 4px rgba(70, 129, 244, 0.15)',
      borderRadius: 4,
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 15,
      lineHeight: '26px',
      letterSpacing: '0.46px',
      color: '#FFFFFF',
      alignSelf: 'flex-end',
      marginTop: 30,
      textTransform: 'none',
      marginBottom: 20,
      marginRight: 8,
    },
    buttonStyles: {
      '&:hover': {
        backgroundColor: '#3994FF',
      },
    },
    selectColumnsHeaderStyles: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    recipeStepsTableHeadStyles: {
      padding: 10,
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
    },
    recipeStepsTableRowStyles: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
    },
    domm: {
      width: '100%',
    },
    recipeStepsTableBodyRowStyles: {
      '&:hover': {
        background: '#EFF0F2',
        '& td:last-child': {
          visibility: 'visible',
        },
      },
    },
    recipeStepsActionTypeStyles: {
      fontWeight: 400,
      maxWidth: 190,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: 14,
      fontStyle: 'normal',
      marginBottom: 5,
      textTransform: 'capitalize',
    },
    displayNone: {
      visibility: 'hidden',
    },
    recipeStepsDeleteStyles: {
      width: 18,
      height: 20,
      cursor: 'pointer',
      //   padding: '15px 10px',
    },
    radioStyles: {
      '& span:last-child': {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
        color: '#5F6368',
      },
    },
    replaceWithInput: {
      width: '90%',
    },
    replaceWithText: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 12,
      color: '#5F6368',
    },
    searchFormControl: {
      position: 'relative',
      display: 'flex',
    },
    searchTextField: {},
    searchInputAdornment: {
      zIndex: 0,
      cursor: 'pointer',
      position: 'absolute',
      right: 0,
    },
    isFocused: {
      border: 'none',
      borderBottom: '1px solid grey',
      outline: 'none',
    },
    isBlurred: {
      border: 'none',
      borderBottom: '1px solid transparent',
    },
    circularProgress: {
      transform: 'rotate(180deg) !important',
    },
    circularProgressSuccess: {
      color: '#8BCC74',
    },
    circularProgressRed: {
      color: '#E97567',
    },
    circularBarCell: {},
    nullValueHead: {},
    displayStyles: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    tabledisplayStyles: {
      display: 'flex',
      flexDirection: 'column',
    },
    columnstyles: {},
    barStyles: {
      paddingRight: 110,
      height: 70,
    },
    divStyles: {
      width: 200,
    },

    infoIcon: {
      color: blue[500],
      fontSize: 20,
      cursor: 'pointer',
    },
    noRecordWrapper: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },
    mainHeaderMessage: {
      fontSize: 16,
      color: '#5F6368',
      marginTop: 20,
      fontWeight: 600,
    },
    subHeaderMessage: {
      fontSize: 14,
      color: '#5F6368',
      fontWeight: 400,
    },
    innerWrapper: {
      textAlign: 'center',
    },
    radioButtonCellStyles: {},
    rowsOfTable: {
      display: 'grid',
      gridTemplateColumns: '10% 45% 45%',
    },
  };
});
