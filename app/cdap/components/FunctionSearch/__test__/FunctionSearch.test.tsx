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

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FunctionSearch from 'components/FunctionSearch';
import MyDataPrepApi from 'api/dataprep';

describe('It Should test FunctionSeach Component.', () => {
  beforeEach(() => {
    jest.spyOn(MyDataPrepApi, 'getUsage').mockImplementation(() => {
      return {
        subscribe: (callback) => {
          callback({
            message: 'Success',
            count: 84,
            values: [
              {
                directive: 'encode',
                usage: "encode 'method' :column",
                description: 'Encodes column values using one of base32, base64, or hex.',
                excluded: false,
                alias: false,
                scope: 'SYSTEM',
                arguments: {
                  directive: 'encode',
                  tokens: [
                    {
                      ordinal: 0,
                      optional: false,
                      name: 'method',
                      type: 'TEXT',
                    },
                    {
                      ordinal: 1,
                      optional: false,
                      name: 'column',
                      type: 'COLUMN_NAME',
                    },
                  ],
                },
                categories: ['transform'],
              },
              {
                directive: 'uppercase',
                usage: 'uppercase :column',
                description: 'Changes the column values to uppercase.',
                excluded: false,
                alias: false,
                scope: 'SYSTEM',
                arguments: {
                  directive: 'uppercase',
                  tokens: [
                    {
                      ordinal: 0,
                      optional: false,
                      name: 'column',
                      type: 'COLUMN_NAME',
                    },
                  ],
                },
                categories: ['transform'],
              },
            ],
          });
        },
      };
    });
  });

  it('Should test whether FunctionSearch Component is rendered .', () => {
    render(<FunctionSearch transformationPanel={jest.fn()} />);
    const searchBox = screen.getByTestId(/search-box/i);
    expect(searchBox).toBeInTheDocument();
  });

  it('Should trigger input field onchange when we search in the Search Box ', () => {
    const { container } = render(<FunctionSearch transformationPanel={jest.fn()} />);
    const searchInputField = container.querySelector('input');
    expect(searchInputField).toBeInTheDocument();
    fireEvent.change(searchInputField, { target: { value: 'uppercase' } });
    expect(searchInputField).toHaveValue('uppercase');

    fireEvent.change(searchInputField, { target: { value: '' } });
    expect(searchInputField).toHaveValue('');
  });

  it('Should clear the input field search.', () => {
    const { container } = render(<FunctionSearch transformationPanel={jest.fn()} />);
    const searchInputField = container.querySelector('input');

    fireEvent.change(searchInputField, { target: { value: 'uppercase' } });
    expect(searchInputField).toHaveValue('uppercase');

    const clearIcon = screen.getByTestId(/clear-search-icon/i);
    fireEvent.click(clearIcon);
  });

  it('It should search and click on uppercase directive.', () => {
    const { container } = render(<FunctionSearch transformationPanel={jest.fn()} />);
    const searchInputField = container.querySelector('input');

    fireEvent.change(searchInputField, { target: { value: 'uppercase' } });
    expect(searchInputField).toHaveValue('uppercase');
    const uppercase = screen.getByTestId(/search-result-uppercase/i);
    fireEvent.click(uppercase);
    expect(uppercase).toBeInTheDocument();
  });
});
