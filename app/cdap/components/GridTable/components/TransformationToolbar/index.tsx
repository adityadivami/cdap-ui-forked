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

import { IconButton } from '@material-ui/core';
import { default as React, useState } from 'react';
import NestedMenu from 'components/GridTable/components/NestedMenu';
import { ITransformationToolBarProps } from 'components/GridTable/components/TransformationToolbar/types';
import {
  Divider,
  LongDivider,
} from 'components/GridTable/components/TransformationToolbar/iconStore';
import FunctionToggle from 'components/GridTable/components/FunctionNameToggle';
import { nestedMenuOptions } from 'components/GridTable/components/TransformationToolbar/utils';
import { IMenuItem } from 'components/GridTable/components/MenuItemComponent/types';
import ExpandButton from 'components/common/ExpandButton';
import { NormalFont } from 'components/common/TypographyText';
import {
  LastDividerBox,
  DividerBox,
  FunctionBoxWrapper,
  SearchBoxWrapper,
} from 'components/common/BoxContainer';
import { ToolBarIconWrapper, ToolBarInnerWrapper } from 'components/common/IconContainer';
import CustomTooltip from 'components/ConnectionList/Components/CustomTooltip';

export default function({
  columnType,
  submitMenuOption,
  setShowBreadCrumb,
  showBreadCrumb,
}: ITransformationToolBarProps) {
  const [showName, setShowName] = useState<boolean>(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement[]>(null);
  const [selectedMenuOptions, setSelectedMenuOptions] = useState<IMenuItem[]>([]);

  const toggleMenu = () => {
    setSelectedMenuOptions([]);
    setAnchorElement(null);
  };

  return (
    <ToolBarIconWrapper data-testid="transformations-toolbar-container">
      <ToolBarInnerWrapper data-testid="nested-menu-container">
        {nestedMenuOptions?.map((eachOption, optionIndex) => {
          return (
            <>
              <FunctionBoxWrapper
                data-testid={`toolbar-icon-${eachOption.title
                  .toLowerCase()
                  .split(' ')
                  .join('-')}`}
              >
                <CustomTooltip
                  title={eachOption.title}
                  arrow
                  data-testid={`toolbar-icon-tooltip-${eachOption.title
                    .toLowerCase()
                    .split(' ')
                    .join('-')}`}
                >
                  <IconButton
                    onClick={(clickEvent) => {
                      if (eachOption.options?.length) {
                        clickEvent.preventDefault();
                        clickEvent.stopPropagation();
                        setSelectedMenuOptions(eachOption.options);
                        setAnchorElement([clickEvent.currentTarget]);
                      } else {
                        submitMenuOption(eachOption.action, eachOption.dataType);
                      }
                    }}
                    data-testid="toolbar-icon-button"
                  >
                    {eachOption.icon}
                  </IconButton>
                </CustomTooltip>
                {eachOption.options?.length > 0 && (
                  <NestedMenu
                    menuOptions={selectedMenuOptions}
                    columnType={columnType}
                    submitMenuOption={submitMenuOption}
                    title={eachOption.title}
                    setAnchorElement={setAnchorElement}
                    anchorElement={anchorElement}
                    handleMenuOpenClose={toggleMenu}
                  />
                )}
                {showName && (
                  <NormalFont
                    component="div"
                    data-testid={`toolbar-icon-title-${eachOption.title
                      .toLowerCase()
                      .split(' ')
                      .join('-')}`}
                  >
                    {eachOption.toolName}
                  </NormalFont>
                )}
              </FunctionBoxWrapper>
              {(optionIndex === 4 || optionIndex === 1 || optionIndex === 9) && (
                <DividerBox> {showName ? LongDivider : Divider}</DividerBox>
              )}
            </>
          );
        })}
        <LastDividerBox> {showName ? LongDivider : Divider}</LastDividerBox>
        <SearchBoxWrapper>
          {/* TODO Search functionality UI component will be added here */}
        </SearchBoxWrapper>
      </ToolBarInnerWrapper>
      <FunctionToggle setShowName={setShowName} showName={showName} />
      <ExpandButton
        open={showBreadCrumb}
        onClick={() => setShowBreadCrumb(!showBreadCrumb)}
        dataTestId="toolbar-header-toggler"
      />
    </ToolBarIconWrapper>
  );
}
