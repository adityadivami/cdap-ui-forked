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
import { grey, blue } from '@material-ui/core/colors';
import PrimaryContainedButton from 'components/shared/Buttons/PrimaryContainedButton';
import PrimaryOutlinedButton from 'components/shared/Buttons/PrimaryOutlinedButton';

export const FormFieldWrapper = styled(Box)`
  width: calc(100% - 60px);
  margin-right: 60px;
  margin-bottom: 15px;
  margin-top: 15px;
`;

export const Label = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: #5f6368;
`;

export const ErrorLabel = styled(Label)`
  color: #e05243;
`;

export const Form = styled.form`
  padding-left: 20px;
`;

export const StyledTextField = styled(TextField)`
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
      color: ${grey[600]};
      opacity: 1;
    }
  }
`;

export const StyledTextAreaAutosize = styled(TextareaAutosize)`
  width: 350px;
  font-size: 14px;
  border-color: ${grey[300]};
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
    color: ${grey[600]};
  }
  :hover {
    border: 1px solid #000000;
  }
  resize: none;
`;

export const StyledButton = css`
  width: 162px;
  height: 36px;
  text-transform: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
`;

export const CancelButton = styled(PrimaryOutlinedButton)`
  ${StyledButton}
  margin-right: 20px;
  color: ${blue[500]};
`;

export const SaveButton = styled(PrimaryContainedButton)`
  ${StyledButton}
  background: ${blue[500]};
`;

export const FormButtonWrapper = styled.div`
  float: right;
  padding-top: 63px;
  padding-bottom: 20px;
`;
