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
import { DECODE, ENCODE } from 'components/AddTransformation/constants';
import { DATATYPE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/datatypeOptions';
import { SECURITY_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/securityOptions';
import { IEncodeDecodeOption } from 'components/GridTable/components/NestedMenu/types';
export const getDirective = (functionName: string, selectedColumn: string) => {
  const encodeDecodeOptions: IEncodeDecodeOption[] = [];
  SECURITY_OPTIONS.forEach((eachOptionObj) => {
    if (eachOptionObj.value === ENCODE || eachOptionObj.value === DECODE) {
      encodeDecodeOptions.push(...eachOptionObj.options);
    }
  });
  if (DATATYPE_OPTIONS.some((item) => item.value === functionName)) {
    return `set-type :${selectedColumn} ${functionName}`;
  } else if (encodeDecodeOptions.some((item) => item.value === functionName)) {
    const option: IEncodeDecodeOption = encodeDecodeOptions.find((el) => el.value === functionName);
    if (option) {
      const value = option.directive(selectedColumn);
      return value;
    }
  } else {
    return null;
  }
};
