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

export const useStyles = makeStyles({
  openWorkspaceWrapper: {
    display: 'flex',
    margin: 'auto 0px',
  },
  divider: {
    marginLeft: '22px',
    marginRight: '20px',
  },
  workspace: {
    fontWeight: 500,
    color: '#3994FF',
    letterSpacing: '0.15px',
    lineHeight: '21px',
    fontSize: '14px',
    pointer: 'cursor',
  },
  menuWrapper: {
    zIndex: 1,
  },
  menu: {
    boxShadow: 'none',
    border: '1px solid #DADCE0',
    borderRadius: '0px',
    left: '-66px',
    width: '246px',
    top: '4px',
    position: 'absolute',
  },
  menuList: {
    padding: '0px',
    fontWeight: 400,
    '& *': {
      fontFamily: "'Noto Sans', sans-serif",
    },
    paddingTop: '6px',
    paddingBottom: '6px',
    color: '#5F6368',
  },
  menuItem: {
    marginTop: '8px',
    marginBottom: '8px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  viewAll: {
    color: '#4681F4',
    marginTop: '8px',
    marginBottom: '8px',
    paddingLeft: '20px',
    paddingRight: '20px',
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.15px',
    width: '244px',
  },
  menuItemtext: {
    width: '244px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.15px',
  },
});
