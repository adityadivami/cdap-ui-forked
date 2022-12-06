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

import React, { useRef } from 'react';
import { FormControl, TextField, Typography, Box, Button } from '@material-ui/core';
import styled from 'styled-components';
import T from 'i18n-react';

export interface ICommonRecipeFormProps {
  recipeData: IRecipeData;
  onRecipeDataSave: (data: IRecipeData) => void;
  onCancel: () => void;
  isNameError: boolean;
}

export interface IRecipeData {
  name: string;
  description: string;
  directives: string[];
  id?: number;
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

const DescriptionTextFieldStyle = styled(TextField)`
  width: 350px;
  & .MuiInputBase-root {
    height: 100px;
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
}: ICommonRecipeFormProps) {
  const LabelStyle = getLabelStyle(isNameError);
  const RecipeNameElement = useRef(null);
  const RecipeDescriptionElement = useRef(null);

  const onFormHandle = (e) => {
    e.preventDefault();
    const data = {
      name: RecipeNameElement.current?.value,
      description: RecipeDescriptionElement.current?.value,
      directives: [],
      id: undefined,
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
            defaultValue={recipeData.name}
            error={isNameError}
            id="outlined-error-helper-text"
            helperText={
              isNameError ? 'Another recipe with same name exists. Please input another name' : ''
            }
            fullWidth
            data-cy="secure-key-name"
            inputRef={RecipeNameElement}
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
              variant="outlined"
              placeholder="Input a description to identify it later"
              defaultValue={recipeData.description}
              inputRef={RecipeDescriptionElement}
              fullWidth
              data-testid="recipe-description-field"
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
          >
            {T.translate('features.WranglerNewUI.RecipeForm.labels.save')}
          </SaveButtonStyle>
        </FormButtonWrapperStyle>
      </FormStyle>
    </>
  );
}
