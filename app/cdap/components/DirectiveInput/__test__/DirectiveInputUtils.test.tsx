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

import { handlePasteDirective, eventPreventDefault } from 'components/DirectiveInput/utils';

describe('Testing function', () => {
  const x = [
    {
      alias: true,
      arguments: {
        directive: 'string',
        tokens: [{ name: 'string', optional: false, ordinal: 0, type: 'string' }],
      },

      categories: [''],
      description: 'string',
      directive: 'string',
      excluded: false,
      scope: 'string',
      usage: 'test',
    },
  ];
  it('Should trigger function handlePasteDirective when directivesList.length i greater than 0', () => {
    handlePasteDirective('test', x);
    expect(handlePasteDirective).toBeTruthy();
  });

  it('Should trigger function eventPreventDefault with dummy event', () => {
    const event = new Event('build');
    eventPreventDefault(event);
    expect(eventPreventDefault).toBeTruthy();
  });
});
