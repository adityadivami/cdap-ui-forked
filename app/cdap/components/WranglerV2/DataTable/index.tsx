import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import { Typography } from '@material-ui/core';

const Wrapper = styled.div`
  width: 100%;
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
      rows={data}
      columns={columns}
      autoHeight
      disableColumnMenu
      hideFooter
      headerHeight={48}
    />
  );
}

export const dataGridColumns = [
  {
    field: 'srn',
    headerName: '#',
    width: 134,
    sortable: false,
  },
  {
    field: 'step',
    headerName: 'Recipe Steps',
    width: 326.5,
    sortable: false,
    renderCell: (params) => {
      console.log(params.value, '*** params.value');
      return (
        <Wrapper>
          <Typography component="div" variant="body1">
            {params.value}
          </Typography>
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
