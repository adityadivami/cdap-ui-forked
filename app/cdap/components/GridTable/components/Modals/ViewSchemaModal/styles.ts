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
  dialogWrapper: {
    paddingBottom: '20px',
  },
  modalHeader: {
    color: '#212121',
    fontSize: '20px',
  },
  modalText: {
    color: '#212121',
    fontSize: '16px',
    marginTop: '10px',
  },
  headerFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonStyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    border: '1px solid #DADCE0',
    borderRadius: '4px',
    marginRight: '20px',
    cursor: 'pointer',
  },
  dialogActionGroup: {
    display: 'grid',
    justifyContent: 'center',
    alignItem: 'center',
    gridTemplateColumns: '50% 50%',
    marginTop: '20px',
  },
  closeIcon: {
    cursor: 'pointer',
    marginRight: '5px',
  },
  schemaList: {},
  headersText: {
    boxShadow:
      '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  },
});
