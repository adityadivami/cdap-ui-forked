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

import React from "react";
import { Switch, Router, Route } from "react-router";
import { createBrowserHistory as createHistory } from "history";
import { fireEvent,render, screen } from "@testing-library/react";
import ParsingHeaderActionTemplate from "..";
import { parseImportedSchemas } from "components/AbstractWidget/SchemaEditor/SchemaHelpers";
import T from 'i18n-react';


const history = createHistory({
  basename: "/",
});

describe("It Should Test the ParsingHeaderActionTemplate Component", () => {

  beforeEach(() => {
   render(
      <Router history={history}>
        <Switch>
          <Route>
            <ParsingHeaderActionTemplate
              handleSchemaUpload={() => jest.fn()}
              setErrorOnTransformation={() => jest.fn()}
            />
          </Route>
        </Switch>
      </Router>
    );
  })
  it("Should trigger ParsingHeaderActionTemplate Component fileInput element", () => {

    const fileContents       = 'file contents';
    const file               = new Blob([fileContents], {type : 'text/plain'});
    const fileInputElement = screen.getByTestId(/fileinput/i)
    fireEvent.change(fileInputElement, {target: {files: [file]}})  
    expect(fileInputElement).toBeInTheDocument()

  });

  it("check if the label is rendered as expected ", () => {
    const labelElement = screen.getByTestId(/schema-text-styles-label/i);
    expect(labelElement).toHaveTextContent(`${T.translate('features.WranglerNewUI.WranglerNewParsingDrawer.importSchema')}`)

  });
});
