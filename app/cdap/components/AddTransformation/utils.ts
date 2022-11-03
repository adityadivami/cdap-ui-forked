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
import { DATATYPE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/datatypeOptions';
import {
  FILTER_OPTIONS,
  FILTER_TRANSFORMATIONS_MAP,
} from 'components/GridTable/components/TransformationComponents/Filter/options';
import { ITransformationComponentValues } from './types';
export const getDirective = (
  functionName: string,
  columnSelected: string,
  directiveComponentValues: ITransformationComponentValues
) => {
  if (DATATYPE_OPTIONS.some((eachOption) => eachOption.value === functionName)) {
    return `set-type :${columnSelected} ${functionName}`;
  } else if (functionName === 'filter') {
    const condition =
      FILTER_TRANSFORMATIONS_MAP[directiveComponentValues.filterRadioOption][
        directiveComponentValues.filterOptionSelected
      ];
    const transformation = FILTER_OPTIONS?.filter(
      (el) => el?.value === directiveComponentValues?.filterOptionSelected
    );
    if (transformation.length) {
      return transformation[0].directive(
        condition,
        columnSelected,
        directiveComponentValues.ignoreCase,
        directiveComponentValues.filterOptionValue
      );
    }
  } else if (functionName === 'filter') {
    const condition =
      FILTER_TRANSFORMATIONS_MAP[directiveComponentValues.filterRadioOption][
        directiveComponentValues.filterOptionSelected
      ];
    const transformation = FILTER_OPTIONS?.filter(
      (el) => el?.value === directiveComponentValues?.filterOptionSelected
    );
    if (transformation.length) {
      return transformation[0].directive(
        condition,
        columnSelected,
        directiveComponentValues.ignoreCase,
        directiveComponentValues.filterOptionValue
      );
    }
  } else {
    return null;
  }
};
