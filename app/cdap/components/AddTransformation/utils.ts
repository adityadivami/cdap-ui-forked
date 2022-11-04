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
import { DATATYPE_OPTIONS } from '../GridTable/components/NestedMenu/menuOptions/datatypeOptions';
import { USING_PATTERN_OPTIONS } from 'components/GridTable/components/TransformationComponents/PatternExtract/options';
import { ITransformationComponentValues } from './types';
export const getDirective = (
  functionName: string,
  columnSelected: string,
  directiveComponentValues: ITransformationComponentValues
) => {
  if (DATATYPE_OPTIONS.some((item) => item.value === functionName)) {
    return `set-type :${columnSelected} ${functionName}`;
  } else if (functionName === 'using-delimiters') {
    return `split-to-columns :${columnSelected} ${
      directiveComponentValues.customInput
        ? directiveComponentValues.customInput
        : directiveComponentValues.radioOption
    }`;
  } else if (functionName === 'using-patterns') {
    const option = USING_PATTERN_OPTIONS?.filter(
      (el) => el.value === directiveComponentValues.extractOptionSelected
    );
    if (option?.length) {
      return option[0].extractDirective(
        columnSelected,
        directiveComponentValues.customInput,
        directiveComponentValues.startValue,
        directiveComponentValues.endValue,
        directiveComponentValues.nDigit
      );
    }
  } else {
    return null;
  }
};
