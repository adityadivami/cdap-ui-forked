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

import { useStyles } from 'components/ConnectionList/styles';
import { IHeaderSearchInputFieldProps } from 'components/ConnectionList/types';
import React from 'react';

export default function({ type, classnames, refs, onChange, index }: IHeaderSearchInputFieldProps) {
  const classes = useStyles();

  return (
    <input
      type={type}
      className={classnames}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, index)}
      ref={(e: HTMLInputElement) => {
        refs.current[index] = e;
      }}
    />
  );
}
