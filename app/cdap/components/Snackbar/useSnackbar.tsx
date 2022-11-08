// /*
//  * Copyright © 2022 Cask Data, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License"); you may not
//  * use this file except in compliance with the License. You may obtain a copy of
//  * the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
//  * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
//  * License for the specific language governing permissions and limitations under
//  * the License.
//  */

// import { ISnackbarDefaultValues, snackbarDefaultValues } from 'components/ConnectionList/constants';
// import DataPrepStore from 'components/DataPrep/store';
// import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
// import { useState } from 'react';

// export const useSnackbar = () => {
//   const [snackbar, setSnackbarValue] = useState<ISnackbarDefaultValues>(snackbarDefaultValues);

//   const setSnackbar = (newValue: ISnackbarDefaultValues) => {
//     setSnackbarValue(newValue);
//   };

//   DataPrepStore.dispatch({
//     type: DataPrepActions.setSnackbarStatus,
//     payload: {
//       open: false,
//       isSuccess: false,
//       message: '',
//     },
//   });

//   return { snackbar, setSnackbar };
// };
