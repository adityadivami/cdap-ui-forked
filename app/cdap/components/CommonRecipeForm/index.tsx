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

import React, { useEffect, useState } from 'react';
import { FormControl, TextField, Typography, Box, Button } from '@material-ui/core';
import styled from 'styled-components';
import T from 'i18n-react';
import { TextareaAutosize } from '@material-ui/core';

export interface ICommonRecipeFormProps {
  recipeData: IRecipeData;
  onRecipeDataSave: (data: IRecipeData) => void;
  onCancel: () => void;
  isNameError: boolean;
  setIsNameError: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IRecipeData {
  recipeName: string;
  description: string;
  directives: string[];
  createdTimeMillis?: number;
  recipeStepsCount?: number;
  updatedTimeMillis?: number;
  recipeId?: IRecipeId;
}

export interface IRecipeId {
  recipeId: string;
  namespace: INameSpace;
}

export interface INameSpace {
  name: string;
  generation: number;
}

const FormFieldWrapper = styled(Box)`
  width: calc(100% - 60px);
  margin-right: 60px;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const CommonLabelStyle = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15;
`;

const LabelErrorStyle = styled(CommonLabelStyle)`
  color: #e05243;
`;
const NormalLabelStyle = styled(CommonLabelStyle)`
  color: #5f6368;
`;

const FormStyle = styled.form`
  padding-left: 20px;
`;

const RecipeNameTextFieldStyle = styled(TextField)`
  width: 350px;
`;

const DescriptionTextFieldStyle = styled(TextareaAutosize)`
  width: 350px;
  border-color: #e0e0e0;
  border-radius: 4px;
  height: 100px !important;
  padding: 18.5px 14px;
  color: #e0e0e0;
  & .MuiInputBase-root {
    height: 100px !important;
    border-color: #e0e0e0;
    padding: 18.5px 14px;
    color: #e0e0e0;
  }
  & .textarea {
    border-color: #e0e0e0;
    height: 100px !important;
    padding: 18.5px 14px;
    color: #e0e0e0;
  }
`;

const CancelButtonStyle = styled(Button)`
  width: 162px;
  height: 36px;
  margin-right: 20px;
`;

const SaveButtonStyle = styled(Button)`
  width: 162px;
  height: 36px;
`;

const FormButtonWrapperStyle = styled.div`
  float: right;
`;

const getLabelStyle = (isNameError) => {
  return isNameError ? LabelErrorStyle : NormalLabelStyle;
};

export default function({
  recipeData,
  onRecipeDataSave,
  onCancel,
  isNameError,
  setIsNameError,
}: ICommonRecipeFormProps) {
  const LabelStyle = getLabelStyle(isNameError);
  const [formdata, setRecipeFormData] = useState({
    recipeName: '',
    description: '',
  });

  useEffect(() => {
    if (formdata.recipeName && formdata.description) {
      setIsNameError(false);
    }
  }, [formdata]);

  const onFormHandle = (e) => {
    e.preventDefault();
    const data = {
      recipeName: formdata.recipeName,
      description: formdata.description,
      directives: [],
    };
    onRecipeDataSave(data);
  };

  return (
    <>
      <FormStyle onSubmit={(event) => onFormHandle(event)} data-testid="recipe-form-parent">
        <FormFieldWrapper>
          <LabelStyle data-testid="recipe-name-label">
            {T.translate('features.WranglerNewUI.RecipeForm.labels.name')}:
          </LabelStyle>
          <RecipeNameTextFieldStyle
            required
            variant="outlined"
            defaultValue={recipeData.recipeName}
            error={isNameError}
            id="outlined-error-helper-text"
            helperText={
              isNameError ? 'Another recipe with same name exists. Please input another name' : ''
            }
            fullWidth
            data-cy="secure-key-name"
            onChange={(event) =>
              setRecipeFormData({ ...formdata, ['recipeName']: event.target.value })
            }
            data-testid="recipe-name-field"
            placeholder="Input a name to identify it later"
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormControl variant="outlined">
            <NormalLabelStyle data-testid="recipe-description-label">
              {T.translate('features.WranglerNewUI.RecipeForm.labels.description')}
            </NormalLabelStyle>

            <DescriptionTextFieldStyle
              required
              aria-label="minimum height"
              minRows={3}
              placeholder="Input a description to identify it later"
              data-testid="recipe-description-field"
              defaultValue={recipeData.description}
              onChange={(event) =>
                setRecipeFormData({ ...formdata, ['description']: event.target.value })
              }
            />
          </FormControl>
        </FormFieldWrapper>
        <FormButtonWrapperStyle>
          <CancelButtonStyle
            variant="outlined"
            color="primary"
            onClick={() => onCancel()}
            data-testid="common-recipe-cancel-button"
          >
            {T.translate('features.WranglerNewUI.RecipeForm.labels.cancel')}
          </CancelButtonStyle>
          <SaveButtonStyle
            variant="contained"
            type="submit"
            color="primary"
            data-testid="common-recipe-save-button"
            disabled={isNameError}
          >
            {T.translate('features.WranglerNewUI.RecipeForm.labels.save')}
          </SaveButtonStyle>
        </FormButtonWrapperStyle>
      </FormStyle>
    </>
  );
}
