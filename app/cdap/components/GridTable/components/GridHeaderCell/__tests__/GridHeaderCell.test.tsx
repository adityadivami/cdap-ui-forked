/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

import { render } from '@testing-library/react';
import React from 'react';
import GridHeaderCell from 'components/GridTable/components/GridHeaderCell/index';
import { screen } from '@testing-library/dom';

describe('To Test Grid Header Cell Component', () => {
  const arr = ['PostgrSQL', 'SQL'];
  render(<GridHeaderCell label={'abc'} types={arr} />);
  it('Should check if the label is displayed as expected', () => {
    screen.getByTestId(`grid-header-cell-abc`);
  });

  it('label in TypographyComponent is Unknown', () => {
    const arr1 = [''];
    render(<GridHeaderCell label={'abc'} types={arr1} />);
  });

  it('datatype1 should return null when types.length is 0 ', () => {
    const arr2 = [];
    render(<GridHeaderCell label={'abc'} types={arr2} />);
  });
});
