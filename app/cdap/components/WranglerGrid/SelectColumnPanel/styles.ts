import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  Radio,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import styled, { css } from 'styled-components';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';

const cellFontCSS = css`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.15px;
`;

export const ColumnInnerWrapper = styled(Box)`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const ColumnWrapper = styled(Box)`
  height: 90%;
`;

export const FlexWrapper = styled(Box)`
  align-items: center;
  display: flex;
  flex-flow: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const PanelContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`;

export const SearchIconButton = styled(IconButton)`
  padding: 5px 0px 5px 5px;

  &.MuiIconButton-root:hover {
    background-color: transparent;
  }
  & .MuiTouchRipple-root {
    display: none;
  }
`;

export const SearchInputField = styled.input`
  margin-right: 5px;
  border: none;
  border-bottom: ${(props) =>
    props.isFocused ? `1px solid ${grey[700]}` : '1px solid transparent'};
  margin-bottom: 5px;
  outline: none;
`;

export const SearchWrapper = styled(Box)`
  position: relative;
  display: flex;
`;

export const StyledButton = styled(Button)`
  width: 73px;
  height: 36px;
  background: #3367d6;
  box-shadow: 0px 2px 4px rgba(70, 129, 244, 0.15);
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 1.25px;
  color: #ffffff;
  margin-top: 30px;
  text-transform: none;
  margin-bottom: 20px;
  margin-right: 8px;
  &:hover {
    background: #3367d6;
  }
  &.Mui-disabled {
    background: ${grey[300]};
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  padding: 0;
  vertical-align: text-top;
  & .MuiIconButton-label {
    width: 24px;
    padding-right: 12px;
  }
`;

const iconSize = css`
  width: 24px;
  height: 24px;
`;

export const CheckboxCheckedIcon = styled(CheckBoxOutlinedIcon)`
  &.MuiSvgIcon-root {
    ${iconSize}
  }
`;
export const CheckboxBlankIcon = styled(CheckBoxOutlineBlankOutlinedIcon)`
  &.MuiSvgIcon-root {
    ${iconSize}
  }
`;

export const CheckboxIndeterminateIcon = styled(IndeterminateCheckBoxOutlinedIcon)`
  &.MuiSvgIcon-root {
    ${iconSize}
  }
`;

export const StyledClearIcon = styled(CloseIcon)`
  &.MuiSvgIcon-root {
    ${iconSize}
  }
`;

export const StyledRadio = styled(Radio)`
  &.MuiRadio-colorPrimary.Mui-checked {
    color: #3367d6 !important;
  }
  &.MuiRadio-root {
    padding: 0;
    vertical-align: text-top;
  }
`;

export const StyledSearchIcon = styled(SearchIcon)`
  &.MuiSvgIcon-root {
    ${iconSize}
  }
`;

export const Wrapper = styled(Box)`
  height: calc(100% - 40px);
  overflow-y: auto;
`;

export const StyledTable = styled(Table)`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 1px rgb(0 0 0 / 20%), 0px 2px 2px rgb(0 0 0 / 14%),
    0px 1px 5px rgb(0 0 0 / 12%);
  border-radius: 4px;
  border: 1px solid #e0e0e0;
`;

export const StyledTableContainer = styled(TableContainer)`
  height: 100%;
  overflow-y: auto;
  margin-top: 10px;
  padding-bottom: 10px;
  width: 460px;
`;

export const StyledTableHead = styled(TableHead)`
  height: 55px;
  background-color: ${grey[100]};
`;

export const StyledTableRow = styled(TableRow)`
  ${cellFontCSS}
  color: ${grey[700]};
  display: grid;
  grid-template-columns: 48px 137px 120px 137px;
  align-items: center;
  height: 100%;
`;

export const StyledTableBodyCell = styled(TableCell)`
  display: flex;
  align-items: center;
  &.MuiTableCell-body {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.1px;
    color: ${grey[700]};
    padding-left: 0;
    height: 62px;
  }
  &:nth-child(2) {
    padding-left: 0px;
  }
  &.MuiTableCell-root {
    border-bottom: none !important;
  }
`;

export const StyledInputTableBodyCell = styled(StyledTableBodyCell)`
  &.MuiTableCell-body {
    padding-left: 22px;
    padding-right: 0;
  }
  &.MuiTableCell-root {
    border-bottom: none !important;
  }
`;

export const StyledTableHeadCell = styled(TableCell)`
  &.MuiTableCell-head {
    ${cellFontCSS}
    padding: 0;
    color: ${grey[700]};
    border-bottom: none !important;
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.4px;
  }
`;

export const MultiSelectionCheckbox = styled(Checkbox)`
  &.MuiCheckbox-root {
    padding-left: 15px !important;
  }
`;
