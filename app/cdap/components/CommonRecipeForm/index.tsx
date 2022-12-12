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

  & .MuiOutlinedInput-root:focus-visible {
    outline: unset !important;
    offset: unset !important;
    border-color: #e0e0e0 !important;
  }
  & .MuiOutlinedInput-input {
    outline: unset !important;
    offset: unset !important;
    border-color: #e0e0e0 !important;
  }
  & .Mui-focused {
    outline: unset !important;
    offset: unset !important;
    border-color: #e0e0e0 !important;
  }
  & .MuiOutlinedInput-notchedOutline:focus-visible {
    outline: unset !important;
    border-color: #e0e0e0 !important;
  }
`;

const DescriptionTextAreaStyle = styled(TextareaAutosize)`
  width: 350px;
  border-color: #e0e0e0;
  border-radius: 4px;
  height: 100px !important;
  padding: 18.5px 14px;

  & .MuiInputBase-root& .textarea {
    height: 100px !important;
    border-color: #e0e0e0;
    padding: 18.5px 14px;
  }
  &.textarea:focus-visible {
    outline: unset !important;
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
  const [recipeFormData, setRecipeFormData] = useState({
    recipeName: '',
    description: '',
    directives: [],
  });

  useEffect(() => {
    if (recipeFormData.recipeName && recipeFormData.description) {
      setIsNameError(false);
    }
  }, [recipeFormData]);

  const onFormHandle = (e) => {
    e.preventDefault();
    onRecipeDataSave(recipeFormData);
  };

  return (
    <>
      <FormStyle onSubmit={(event) => onFormHandle(event)} data-testid="recipe-form-parent">
        <FormFieldWrapper>
          <LabelStyle data-testid="recipe-name-label">
            {T.translate('features.WranglerNewUI.RecipeForm.labels.name')}
          </LabelStyle>
          <RecipeNameTextFieldStyle
            required
            variant="outlined"
            defaultValue={recipeData.recipeName}
            error={isNameError}
            id="outlined-error-helper-text"
            helperText={
              isNameError
                ? T.translate('features.WranglerNewUI.RecipeForm.labels.nameErrorMessage')
                : ''
            }
            fullWidth
            data-cy="secure-key-name"
            onChange={(event) =>
              setRecipeFormData({ ...recipeFormData, ['recipeName']: event.target.value })
            }
            data-testid="recipe-name-field"
            placeholder={T.translate('features.WranglerNewUI.RecipeForm.labels.namePlaceholder')}
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormControl variant="outlined">
            <NormalLabelStyle data-testid="recipe-description-label">
              {T.translate('features.WranglerNewUI.RecipeForm.labels.description')}
            </NormalLabelStyle>

            <DescriptionTextAreaStyle
              required
              aria-label="minimum height"
              minRows={3}
              data-testid="recipe-description-field"
              defaultValue={recipeData.description}
              onChange={(event) =>
                setRecipeFormData({ ...recipeFormData, ['description']: event.target.value })
              }
              placeholder="Input a description to identify it later"
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
