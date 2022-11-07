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
    tableNamesList: {
      border: '2px solid red',
    },
    tableHead: {
      marginTop: '40px',
    },
    tableBody: {
      height: '300px',
      '& .MuiTableCell-root': {
        color: '#5F6368',
        fontSize: '14px',
      },
    },
    tableRowContainer: {
      '& .MuiTableCell-root': {
        paddingTop: '10px',
        paddingBottom: '10px',
      },
      '&:hover': {
        boxShadow: '3px 4px 15px rgba(68, 132, 245, 0.15)',
      },
    },
    headerNamesSeparator: {
      width: '250px',
      border: '1px solid red',
      height: '1px',
    },
    addTransformationBodyStyles: {
      height: 'calc(100% - 100px)',
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
    },
    customTableContainer: {
      height: 'calc(100% - 43px)',
      overflow: 'scroll',
      padding: 0,
    },
    columnsCountTextStyles: {
      width: '100%',
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
      height: 'calc(100vh - 258px)',
      overflow: 'scroll',
    },
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
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#212121',
    },
    columnLeft: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      paddingLeft: '30px',
    },
    columnRight: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      paddingLeft: '0px',
    },
    recipeStepsTableRowStyles: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      '& .MuiTableCell-stickyHeader': {
        backgroundColor: '#FFFFFF',
      },
    },
    nullValuesContainer: {
      width: '134px',
      paddingLeft: '0px',
    },
    recipeStepsDeleteStyles: {
      width: '18px',
      height: '20px',
      cursor: 'pointer',
    },
    radioStyles: {
      '& span:last-child': {
        fontFamily: 'Noto Sans',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        color: '#5F6368',
      },
    },
    replaceWithInput: {
      width: '90%',
    },
    replaceWithText: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      color: '#5F6368',
    },
    leftSideCell: {
      maxWidth: '200px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingLeft: '30px',
      '& .MuiTableCell-root': {
        padding: '10px 0px 10px 30px',
      },
    },
  };
});
