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

import styled, { css } from 'styled-components';
import { TextField, Typography, Box } from '@material-ui/core';
import { TextareaAutosize } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import PrimaryContainedButton from 'components/shared/Buttons/PrimaryContainedButton';
import PrimaryOutlinedButton from 'components/shared/Buttons/PrimaryOutlinedButton';

export const FormFieldWrapper = styled(Box)`
  margin-bottom: 15px;
  margin-right: 60px;
  margin-top: 15px;
  width: calc(100% - 60px);
`;

export const Label = styled(Typography)`
  color: ${grey[700]};
  font-style: normal;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.4px;
  line-height: 20px;
`;

export const ErrorLabel = styled(Label)`
  color: #e05243;
`;

export const StyledTextField = styled(TextField)`
  input::placeholder {
    color: ${grey[600]};
    opacity: 1;
  }
  .MuiFormHelperText-root.Mui-error {
    color: #e05243;
    margin-left: 0px;
    margin-right: 0px;
  }
  .MuiOutlinedInput-input {
    padding: 12px 14px;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: 0.15px;
  }
  width: 460px;
`;

export const ErrorTextField = styled(StyledTextField)`
  .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: 1px solid #ff8a80;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #ff8a80;
  }
`;

export const NormalTextField = styled(StyledTextField)`
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #000000;
  }
`;

export const StyledTextAreaAutosize = styled(TextareaAutosize)`
  border-color: ${grey[300]};
  border-radius: 4px;
  :focus-visible {
    outline: unset !important;
    border: 1px solid #000000;
  }
  :focus-visible {
    outline: unset !important;
    border: 1px solid #000000;
  }
  font-size: 14px;
  height: 100px !important;
  :hover {
    border: 1px solid #000000;
  }
  letter-spacing: 0.15px;
  line-height: 150%;
  padding: 10.5px 14px;
  resize: none;
  width: 460px;
  ::placeholder {
    color: ${grey[600]};
  }
`;

export const StyledButton = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
`;

export const CancelButton = styled(PrimaryOutlinedButton)`
  ${StyledButton}
  color: #3367D6;
  width: 92px;
`;

export const SaveButton = styled(PrimaryContainedButton)`
  ${StyledButton}
  background: #3367d6;
  margin-right: 20px;
  width: 70px;
`;

export const CreateRecipeFormButtonWrapper = styled.div`
  float: left;
  margin-top: 100px;
  padding-bottom: 20px;
`;

export const EditRecipeFormButtonWrapper = styled(CreateRecipeFormButtonWrapper)`
  margin-top: 348px;
`;
