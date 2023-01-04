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

import React, { Dispatch, ChangeEvent, FormEvent, SetStateAction } from 'react';
import { ISnackbar } from 'components/Snackbar';

export interface IRecipeFormProps {
  recipeFormData: IRecipeFormData;
  isRecipeNameError: boolean;
  recipeNameErrorMessage: string;
  onRecipeNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setRecipeFormData: Dispatch<React.SetStateAction<IRecipeFormData>>;
  onCancel: () => void;
  isSaveDisabled: boolean;
  recipeFormAction: string;
}

export interface IRecipeFormData {
  recipeName: string;
  description: string;
  directives: string[];
}

export interface ICreateRecipeProps {
  setShowRecipeForm: Dispatch<SetStateAction<boolean>>;
  setSnackbar: Dispatch<SetStateAction<ISnackbar>>;
}
