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

import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  closeHeader: {
    transform: 'rotate(180deg)',
  },
  openHeader: {},
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #E0E0E0',
    marginTop: '0px',
    paddingLeft: '18px',
    paddingRight: '15px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '0px',
    marginRight: '0px',
    width: '80%',
  },
  searchIcon: {
    border: 'none',
    outline: 'none',
    width: '250px',
  },
  closeBreadCrumb: {
    transform: 'rotate(180deg)',
  },
  openedBreadcrumb: {},
  functionNameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '-webkit-fill-available',
    '& .MuiIconButton-root': {
      paddingBottom: '8px',
    },
  },
  typoClass: {
    color: '#757575',
    fontSize: '14px',
    padding: '0px 12px',
    marginBottom: '10px',
  },
  arrow: {
    width: '5%',
  },
  divider: {
    margin: '0px 4px',
  },
  tooltipToolbar: {
    background: '#616161',
    color: '#FFFFFF',
    fontSize: '14px',
  },
  arrowTooltip: {
    '&::before': {
      backgroundColor: '#616161',
    },
  },
  lastDivider: {
    margin: '0px 0px 0px 4px',
  },
});
