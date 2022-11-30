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

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import IngestViewSchemaDropDown from "components/GridTable/components/Breadcrumb/IngestViewSchemaDropDown/index";

describe("Test IngestViewSchemaDropDown Component", () => {
  beforeEach(() => {
    render(<IngestViewSchemaDropDown />);
  });

  it("Should render IngestViewSchemaDropDown and trigger drop down button by clicking", () => {
    const buttonElement = screen.getByTestId(/ingest-view-drop-button/i)
    fireEvent.click(buttonElement)
    expect(buttonElement).toBeInTheDocument()
  });

  it("Should trigger handleClose and check text inside is as expected", () => {
    const menuItemElement = screen.getAllByTestId(/ingest-view-menu-item/i)
    expect(menuItemElement[0]).toBeInTheDocument()
    fireEvent.click(menuItemElement[0])
    expect(menuItemElement[0]).toHaveTextContent('Ingest Data')
    expect(menuItemElement[1]).toHaveTextContent('View Schema')
  })
});
