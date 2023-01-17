import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import { Button, Fade, IconButton, Paper, Popper, Typography } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  width: 100%;

  .MuiButtonBase-root {
    display: none;
  }
`;

const StyledDataGrid = styled(DataGrid)`
  &&& {
    .MuiDataGrid-columnHeaderWrapper {
      justify-content: space-evenly;
      background-color: ${grey[100]};
    }
    .MuiDataGrid-columnSeparator {
      display: none;
    }
    .MuiDataGrid-row:hover {
      background-color: ${grey[300]};

      .MuiTypography-root {
        width: 334px;
      }
      .MuiButtonBase-root {
        display: block;
      }
    }
    .MuiTypography-body1 {
      white-space: break-spaces;
    }
  }
`;

export default function CustomDataGrid(props) {
  const { data, columns } = props;

  return (
    <StyledDataGrid
      autoHeight
      columns={columns}
      disableColumnMenu
      headerHeight={48}
      hideFooter
      rows={data}
    />
  );
}

export const dataGridColumns = [
  {
    field: 'srn',
    headerName: '#',
    width: 71,
    sortable: false,
  },
  {
    field: 'step',
    headerName: 'Recipe Steps',
    width: 396,
    sortable: false,
    renderCell: (params) => {
      return (
        <Wrapper>
          <Typography component="div" variant="body1">
            {params.value}
          </Typography>
          <IconButton>
            <DeleteOutlinedIcon />
          </IconButton>
        </Wrapper>
      );
    },
  },
];

export const dataGridRows = [
  {
    id: 1,
    srn: '01',
    step: "Parse Column 'Body' with delimiter 'comma' and set 'first row as header' ",
  },
  { id: 2, srn: '02', step: "Delete Column 'body'" },
];
