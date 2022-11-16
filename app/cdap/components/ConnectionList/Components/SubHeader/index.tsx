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

import { makeStyles, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { blue, grey } from '@material-ui/core/colors';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import Breadcrumb from 'components/GridTable/components/Breadcrumb';
import T from 'i18n-react';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getCurrentNamespace } from 'services/NamespaceStore';
import styled from 'styled-components';

interface ISubHeader {
  selectedConnection: string;
}

const AddConnectionIcon = styled(AddCircleOutlineOutlinedIcon)`
  font-size: x-large;
  color: ${grey[700]};
`;

const CustomizedLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const FlexContainer = styled(Box)`
  display: flex;
  align-items: flex-end;
`;
const FeaturesContainer = styled(FlexContainer)`
  gap: 30px;
  font-size: 14px;
`;

const ImportDataContainer = styled(FlexContainer)`
  gap: 12px;
  &:hover {
    cursor: pointer;
  }
`;

const TypographyLabel = styled(Typography)`
  color: ${grey[900]};
  font-size: 14px;
  line-height: 21px;
`;

const SaveIcon = styled(SaveAltRoundedIcon)`
  font-size: x-large;
  color: ${grey[700]};
`;

export const useStyles = makeStyles({
  breadcrumbContainer: {
    borderBottom: `1px solid ${grey[300]}`,
    display: 'flex',
    justifyContent: 'space-between',
    height: '48px',
    alignItems: 'center',
    paddingRight: 30,
    '& .MuiBreadcrumbs-root': {
      fontSize: '14px',
      fontWeight: '400',
    },
    '& .MuiTypography-root': {
      color: '#000000',
      lineHeight: '21px',
    },
    '& a': {
      color: blue[500],
      lineHeight: '21px',
    },
  },
});

export default function({ selectedConnection }: ISubHeader) {
  const classes = useStyles();
  const location = useLocation();

  // Local storage will be removed
  // Need to integrate connector types code to achieve the redirection from add connections page
  const handleAddConnection = () => {
    localStorage.setItem('addConnectionRequestFromNewUI', selectedConnection);
  };

  return (
    <Box className={classes.breadcrumbContainer} data-testid="breadcrumb-container-parent">
      <Breadcrumb
        datasetName={T.translate('features.WranglerNewUI.Breadcrumb.labels.connectionsList')}
        location={location}
      />
      <FeaturesContainer>
        <CustomizedLink to={`/ns/${getCurrentNamespace()}/connections/create`}>
          <ImportDataContainer
            onClick={handleAddConnection}
            data-testid="sub-header-handle-add-connection"
          >
            <AddConnectionIcon />
            <TypographyLabel>
              {T.translate('features.WranglerNewUI.AddConnections.referenceLabel')}
            </TypographyLabel>
          </ImportDataContainer>
        </CustomizedLink>
        <ImportDataContainer>
          <SaveIcon />
          <TypographyLabel>
            {T.translate('features.WranglerNewUI.ImportData.referenceLabel')}
          </TypographyLabel>
        </ImportDataContainer>
      </FeaturesContainer>
    </Box>
  );
}
