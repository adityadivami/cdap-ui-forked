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

import { ISnackbar } from 'components/Snackbar';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { IRecipe } from 'components/RecipeList/types';

export interface IRecipeFormProps {
  isRecipeNameError: boolean;
  isSaveDisabled: boolean;
  onCancel: () => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onRecipeDescriptionChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onRecipeNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  recipeFormAction: string;
  recipeFormData: IRecipeFormData | IRecipeData;
  recipeNameErrorMessage: string;
}

export interface IRecipeFormData {
  recipeName: string;
  description: string;
}

export interface IRecipeData extends IRecipeFormData {
  directives: string[];
}

export interface IEditRecipeProps {
  selectedRecipe: IRecipe;
  onCancelClick: () => void;
  setSnackbar: (value: ISnackbar) => void;
  setRecipeFormOpen: Dispatch<SetStateAction<boolean>>;
  setIsRecipeListUpdated: Dispatch<SetStateAction<boolean>>;
}

export interface IRecipeNameErrorData {
  isRecipeNameError: boolean;
  recipeNameErrorMessage: string;
}

export interface IGetRecipeByNameService {
  formData: IRecipeFormData;
  onGetRecipeByNameError: (err: Record<string, unknown>, formData: IRecipeFormData) => void;
  onGetRecipeByNameResponse: (formData: IRecipeFormData) => void;
}

export interface IEditRecipeService {
  selectedRecipe: IRecipe;
  payload: IRecipeData;
  onUpdateRecipeResponse: () => void;
  onUpdateRecipeError: (err: Record<string, unknown>) => void;
}
