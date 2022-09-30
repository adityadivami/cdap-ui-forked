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
  wrapper: {
    '& *': {
      fontFamily: "'Noto Sans', sans-serif",
    },
  },
  header: {
    height: '48px',
    borderBottom: '1px solid #E0E0E0',
    display: 'flex',
    alignItems: 'center',
  },
  breadcrumb: {
    marginLeft: '30px',
    textDecoration: 'none',
  },
  explorationList: {
    marginTop: '30px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.15px',
    fontWeight: 400,
  },
  noRecords: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eleStyles: {
    fontSize: 30,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    opacity: 0.5,
    background: 'white',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 2000,
  },
  noRecordWrapper: {
    height: 'calc(100vh - 244px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& *': {
      fontFamily: "'Noto Sans', sans-serif",
    },
    marginTop: 30,
  },
  mainHeaderMessage: {
    fontSize: '20px',
    color: '#000000',
    marginTop: '20px',
  },
  subHeaderMessage: {
    fontSize: '16px',
    color: '#000000',
  },
  innerWrapper: {
    textAlign: 'center',
  },
});
