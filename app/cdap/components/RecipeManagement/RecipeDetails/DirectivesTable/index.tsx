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
import Table from 'components/shared/Table';
import TableHeader from 'components/shared/Table/TableHeader';
import TableRow from 'components/shared/Table/TableRow';
import TableCell from 'components/shared/Table/TableCell';
import TableBody from 'components/shared/Table/TableBody';
import T from 'i18n-react';
import styled, { css } from 'styled-components';
import { grey } from '@material-ui/core/colors';

const styledTableRowCSS = css`
  border: 1px solid rgb(0 0 0 / 12%);
  padding: 10px 16px;
  border-bottom: none;
`;

const StyledTableHeader = styled(TableHeader)`
  background-color: transparent;
`;

const StyledTableHeadRow = styled(TableRow)`
  ${styledTableRowCSS}
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.12);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const StyledTableBodyRow = styled(TableRow)`
  ${styledTableRowCSS}
  background: #FFFFFF;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.12);
`;

const StyledTableHeaderCell = styled(TableCell)`
  color: ${grey[600]};
  font-weight: 700;
  font-size: 12px;
`;

const StyledTableBodyCell = styled(TableCell)`
  color: ${grey[700]};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const PREFIX = 'features.WranglerNewUI.RecipeDetails';

const DirectivesTable = ({ directives }: { directives: string[] }) => {
  const getSerialNumber = (recipeStepIndex: number) => {
    if (recipeStepIndex < 10) {
      return `0${recipeStepIndex + 1}`;
    }
    return `${recipeStepIndex + 1}`;
  };

  return (
    <Table columnTemplate="0.5fr 2fr">
      <StyledTableHeader>
        <StyledTableHeadRow>
          <StyledTableHeaderCell>#</StyledTableHeaderCell>
          <StyledTableHeaderCell>
            {T.translate(`${PREFIX}.tableHeaders.recipeStep`)}
          </StyledTableHeaderCell>
        </StyledTableHeadRow>
      </StyledTableHeader>
      <TableBody>
        {directives.map((recipeStep, recipeStepIndex) => {
          return (
            <StyledTableBodyRow>
              <StyledTableBodyCell data-testid={`recipe-step-index-${recipeStepIndex}`}>
                {getSerialNumber(recipeStepIndex)}
              </StyledTableBodyCell>
              <StyledTableBodyCell data-testid={`recipe-step-text-${recipeStepIndex}`}>
                {recipeStep}
              </StyledTableBodyCell>
            </StyledTableBodyRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DirectivesTable;
