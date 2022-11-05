import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { grey } from '@material-ui/core/colors';

const SimpleLabel = styled(Typography)`
  &&& {
    margin-left: 2px;
    margin-right: 5px;
    margin-top: 2px;
  }
`;

const OutlinedLabel = styled(Typography)`
  &&& {
    background-color: ${grey[600]};
    height: 21px;
    width: 20px;
    color: #ffffff;
    border-radius: 4px;
  }
`;

export default function({ children, type }) {
  return (
    <>
      {type === 'simpleLabel' && (
        <SimpleLabel data-testid="footerpanel-simple-label" component="span">
          {children}
        </SimpleLabel>
      )}
      {type === 'outlinedLabel' && (
        <OutlinedLabel data-testid="footerpanel-outlined-label" component="span">
          {children}
        </OutlinedLabel>
      )}
    </>
  );
}
