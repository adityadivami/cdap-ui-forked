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

import MyDataPrepApi from 'api/dataprep';
import { ICreateRecipeService, IGetRecipeByNameService } from 'components/RecipeManagement/types';
import { getCurrentNamespace } from 'services/NamespaceStore';

export const getRecipeByNameService = ({
  formData,
  onGetRecipeByNameResponse,
  onGetRecipeByNameError,
}: IGetRecipeByNameService) => {
  const params = {
    context: getCurrentNamespace(),
    recipeName: formData.recipeName,
  };
  MyDataPrepApi.getRecipeByName(params).subscribe(
    () => {
      onGetRecipeByNameResponse(formData);
    },
    (err: Record<string, unknown>) => {
      onGetRecipeByNameError(err, formData);
    }
  );
};

export const createRecipeService = ({
  requestBody,
  onCreateRecipeResponse,
  onCreateRecipeError,
}: ICreateRecipeService) => {
  const params = {
    context: getCurrentNamespace(),
  };
  MyDataPrepApi.createRecipe(params, requestBody).subscribe(
    () => {
      onCreateRecipeResponse();
    },
    (err: Record<string, unknown>) => {
      onCreateRecipeError(err);
    }
  );
};
