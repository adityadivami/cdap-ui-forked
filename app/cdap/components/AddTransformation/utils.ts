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
import { SECURITY_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/securityOptions';
import { DATATYPE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/datatypeOptions';
import { DECODE, ENCODE } from 'components/AddTransformation/constants';
export const getDirective = (functionName: string, columnSelected: string) => {
  const encodeDecodeOptions = [];
  SECURITY_OPTIONS.forEach((eachOptionObj) => {
    if (eachOptionObj.value === ENCODE || eachOptionObj.value === DECODE) {
      encodeDecodeOptions.push(...eachOptionObj.options);
    }
  });
  if (DATATYPE_OPTIONS.some((item) => item.value === functionName)) {
    return `set-type :${columnSelected} ${functionName}`;
  } else if (encodeDecodeOptions.some((item) => item.value === functionName)) {
    const option = encodeDecodeOptions.find((el) => el.value === functionName);
    if (option) {
      const value = option.directive(columnSelected);
      return value;
    }
  } else {
    return null;
  }
};
