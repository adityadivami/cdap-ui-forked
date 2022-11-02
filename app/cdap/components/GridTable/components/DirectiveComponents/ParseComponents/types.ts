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

import { ITransformationValues } from 'components/AddTransformation/types';

export interface IParseCSVProps {
  transformationValues: ITransformationValues;
  setTransformationValues: React.Dispatch<React.SetStateAction<ITransformationValues>>;
}

export interface IInputRadioWithCustomInputProps {
  options: IParseOptions[];
  radioValue: string;
  setRadioValue: React.Dispatch<React.SetStateAction<string>>;
  customInputType: string;
  customInput: string;
  setCustomInput: React.Dispatch<React.SetStateAction<string>>;
}

export interface IParseOptions {
  value: string;
  label: string;
  directiveExpression?: string;
}

export interface IParseComponentProps {
  sectionHeading: string;
  children: JSX.Element;
}

export interface ISetTransformationValues {
  setTransformationValues: React.Dispatch<React.SetStateAction<ITransformationValues>>;
}
