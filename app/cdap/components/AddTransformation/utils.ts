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
import { MENU_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/menuOptions';
import { SET_CHARACTER_ENCODING } from 'components/AddTransformation/constants';
import { IMenuOption } from 'components/AddTransformation/types';

export const getDirective = (functionName: string, selectedColumn: string) => {
  const characterEncodingOptions: IMenuOption[] = [];
  MENU_OPTIONS.forEach((eachOption) => {
    if (eachOption.value === SET_CHARACTER_ENCODING) {
      characterEncodingOptions.push(...eachOption.options);
    }
  });
  if (DATATYPE_OPTIONS.some((eachOption) => eachOption.value === functionName)) {
    return `set-type :${selectedColumn} ${functionName}`; // TODO: get directive from DATATYPE_OPTIONS
  } else if (characterEncodingOptions.some((eachOption) => eachOption.value === functionName)) {
    const option: IMenuOption = characterEncodingOptions.find(
      (eachOption) => eachOption.value === functionName
    );
    if (option) {
      const value = option.directive(selectedColumn);
      return value;
    }
  } else {
    return null;
  }
};
