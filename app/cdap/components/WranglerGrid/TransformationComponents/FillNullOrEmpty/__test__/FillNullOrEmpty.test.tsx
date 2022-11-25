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

import { render, screen } from "@testing-library/react";
import React from "react";
import FillNullOrEmpty from "components/WranglerGrid/TransformationComponents/FillNullOrEmpty/index";
import T from "i18n-react";

describe("Should test FillNullOrEmpty", () => {
  const PREFIX =
    "features.WranglerNewUI.GridPage.transformationUI.fillNullOrEmpty";

  it("Should render FillNullOrEmpty component and check if subHeader is rendered as expected", () => {
    render(
      <FillNullOrEmpty
        setTransformationComponentsValue={jest.fn()}
        transformationComponentValues={undefined}
      />
    );

    const subHeaderElement = screen.getByTestId(/null-empty-sub-header/i);
    expect(subHeaderElement).toHaveTextContent(
      `${T.translate(`${PREFIX}.fillNullEmpty`)}`
    );
  });
});
