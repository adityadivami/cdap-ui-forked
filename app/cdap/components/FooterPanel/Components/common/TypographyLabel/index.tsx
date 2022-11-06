import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { ITypographyLabelProps } from 'components/FooterPanel/Components/common/TypographyLabel/types';
import React from 'react';
import styled from 'styled-components';

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
    padding: 4px 5px;
  }
`;

/**
 *
 * @param children: children to be rendered inside the variants of TypographyLabel
 * @param type: simple or outlined, 2 variants of Typography Label
 * @returns TypographyLabel with appropriate variations according to props
 */
export default function({ children, type }: ITypographyLabelProps) {
  return (
    <>
      {type === 'simple' && (
        <SimpleLabel data-testid="footerpanel-simple-label" component="span">
          {children}
        </SimpleLabel>
      )}
      {type === 'outlined' && (
        <OutlinedLabel data-testid="footerpanel-outlined-label" component="span">
          {children}
        </OutlinedLabel>
      )}
    </>
  );
}
