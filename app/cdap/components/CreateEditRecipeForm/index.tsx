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
import { ICommonRecipeFormProps, IRecipeData } from 'components/CreateEditRecipeForm/types';

const FormFieldWrapper = styled(Box)`
  width: calc(100% - 60px);
  margin-right: 60px;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const Label = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
`;

const ErrorLabel = styled(Label)`
  color: #e05243;
`;
const NormalLabel = styled(Label)`
  color: #5f6368;
`;

const StyledForm = styled.form`
  padding-left: 20px;
`;

const RecipeNameTextFieldStyle = styled(TextField)`
  width: 350px;
  .MuiOutlinedInput-input {
    padding: 12px 14px;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: 0.15px;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #000000;
  }
  input::placeholder {
      color: #757575;
      opacity: 1;
    }
  }
`;

const DescriptionTextAreaStyle = styled(TextareaAutosize)`
  width: 350px;
  font-size: 14px;
  border-color: #e0e0e0;
  border-radius: 4px;
  height: 100px !important;
  padding: 10.5px 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
  :focus-visible {
    outline: unset !important;
    border: 1px solid #000000;
  }
  ::placeholder {
    color: #757575;
  }
  :hover {
    border: 1px solid #000000;
  }
`;

const CancelButtonStyle = styled(Button)`
  width: 162px;
  height: 36px;
  margin-right: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: #2196f3;
  text-transform: none;
`;

const SaveButtonStyle = styled(Button)`
  width: 162px;
  height: 36px;
  text-transform: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
  background: #2196f3;
`;

const FormButtonWrapperStyle = styled.div`
  float: right;
  padding-top: 63px;
  padding-bottom: 20px;
`;

const getLabelStyle = (isNameError) => {
  return isNameError ? ErrorLabel : NormalLabel;
};

export default function({
  recipeData,
  onRecipeDataSave,
  onCancel,
  isNameError,
  setIsNameError,
}: ICommonRecipeFormProps) {
  const StyledLabel = getLabelStyle(isNameError);
  const [recipeFormData, setRecipeFormData] = useState<IRecipeData>({
    recipeName: '',
    description: '',
    directives: [],
  });

  const [isSaveDisable, setIsSaveDisable] = useState<boolean>(true);

  useEffect(() => {
    if (isNameError) {
      setIsSaveDisable(true);
    }
  }, [isNameError]);

  useEffect(() => {
    setRecipeFormData(recipeData);
  }, [recipeData]);

  useEffect(() => {
    if (
      recipeFormData.recipeName === '' ||
      recipeFormData.description === '' ||
      recipeFormData.recipeName?.trim().length === 0 ||
      recipeFormData.description?.trim().length === 0
    ) {
      setIsSaveDisable(true);
    } else {
      setIsNameError(false);
      setIsSaveDisable(false);
    }
  }, [recipeFormData]);

  const onFormHandle = (e) => {
    e.preventDefault();
    onRecipeDataSave(recipeFormData);
  };

  return (
    <>
      <StyledForm onSubmit={(event) => onFormHandle(event)} data-testid="recipe-form-parent">
        <FormFieldWrapper>
          <StyledLabel data-testid="recipe-name-label">
            {T.translate('features.WranglerNewUI.RecipeForm.labels.name')}
          </StyledLabel>
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
            onChange={(event) =>
              setRecipeFormData({ ...recipeFormData, ['recipeName']: event.target.value })
            }
            data-testid="recipe-name-field"
            placeholder={T.translate('features.WranglerNewUI.RecipeForm.labels.namePlaceholder')}
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormControl variant="outlined">
            <NormalLabel data-testid="recipe-description-label">
              {T.translate('features.WranglerNewUI.RecipeForm.labels.description')}
            </NormalLabel>
            <DescriptionTextAreaStyle
              required
              aria-label="minimum height"
              minRows={3}
              data-testid="recipe-description-field"
              defaultValue={recipeData.description}
              onChange={(event) =>
                setRecipeFormData({ ...recipeFormData, ['description']: event.target.value })
              }
              placeholder={T.translate(
                'features.WranglerNewUI.RecipeForm.labels.descriptionPlaceholder'
              )}
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
            disabled={isSaveDisable}
          >
            {T.translate('features.WranglerNewUI.RecipeForm.labels.save')}
          </SaveButtonStyle>
        </FormButtonWrapperStyle>
      </StyledForm>
    </>
  );
}
