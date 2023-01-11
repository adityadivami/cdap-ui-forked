import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import styled from 'styled-components';

export const Container = styled(Box)`
  border-left: 1px solid ${grey[300]};
  height: calc(100vh - 232px);
  overflow: scroll;
  padding-left: 20px;
  padding-right: 10px;
  position: relative;
  width: 500px;
`;
export const Divider = styled.div`
  background-color: ${grey[300]};
  height: 28px;
  margin-bottom: 0px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 0px;
  width: 1px;
`;

export const Label = styled(Typography)`
  &.MuiTypography-body1 {
    color: ${grey[900]};
    font-style: normal;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.25px;
    line-height: 32px;
    text-align: left;
  }
`;

export const IconWrapper = styled(Box)`
  align-items: center;
  display: flex;
`;

export const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: space-between;
`;

export const LeftContainer = styled(Container)`
  border-left: none;
  border-right: 1px solid ${grey[300]};
`;

export const MenuButton = styled(Button)`
  &.MuiButton-root {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.25px;
    line-height: 24px;
    text-align: center;
  }
`;

export const StyledIconButton = styled(IconButton)`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
    text-align: left;
  }
`;
