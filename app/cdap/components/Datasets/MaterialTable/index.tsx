// import React from 'react';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { styled } from '@material-ui/core';

// const StyledDataGrid = styled(DataGrid)({
//   '&.MuiDataGrid-root': {
//     border: 'none',
//   },
//   '& .MuiSvgIcon-root': {
//     display: 'none',
//   },
//   '& .MuiDataGrid-columnHeaderTitle': {
//     fontWeight: '400',
//   },
//   '& .MuiDataGrid-cellContent': {
//     color: '#5F6368',
//     fontSize: '14px',
//   },
//   '& .MuiDataGrid-columnHeaders': {
//     borderBottom: '1px solid #5F6368',
//   },
// });

// const columns: GridColDef[] = [
//   { field: 'DatasetName', headerName: 'Dataset Name', width: 148 },
//   {
//     field: 'FileFormat',
//     headerName: 'File Format',

//     width: 123,
//   },
//   {
//     field: 'Schema',
//     headerName: 'Schema',
//     width: 127,
//   },
//   {
//     field: 'LastUpdated',
//     headerName: 'Last Updated ',

//     width: 138,
//   },
//   {
//     field: 'ConnectionName',
//     headerName: 'Connection Name',

//     width: 202,
//   },
//   {
//     field: 'ConnectionStatus',
//     headerName: 'Connection Status',

//     width: 215,
//   },
//   {
//     field: 'Wrangler',
//     headerName: '',

//     width: 215,
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     ConnectionType: 'Oracle',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '7 columns',
//     LastUpdated: '02 hrs ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '02 hrs ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 2,
//     ConnectionType: 'GCS',
//     DatasetName: 'CarSales_India',
//     FileFormat: 'CSV',
//     Schema: '1 columns',
//     LastUpdated: '02 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '03 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 3,
//     ConnectionType: 'Kakfa',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '2 columns',
//     LastUpdated: '04 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '21 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 4,
//     ConnectionType: 'BigQuery',
//     DatasetName: 'CarSales_India',
//     FileFormat: 'Avro',
//     Schema: '1 columns',
//     LastUpdated: '05 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '03 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 5,
//     ConnectionType: 'Oracle',
//     DatasetName: 'CarSales_USA',
//     FileFormat: 'Table',
//     Schema: '9 columns',
//     LastUpdated: '07 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '21 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 6,
//     ConnectionType: 'GCS',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '5 columns',
//     LastUpdated: '08 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 7,
//     ConnectionType: 'BigQuery',
//     DatasetName: 'CarSales_USA',
//     FileFormat: 'Table',
//     Schema: '8 columns',
//     LastUpdated: '07 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '02 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 8,
//     ConnectionType: 'BigQuery',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '1 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '02 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 9,
//     ConnectionType: 'GCS',
//     DatasetName: 'CarSales_USA',
//     FileFormat: 'CSV',
//     Schema: '3 columns',
//     LastUpdated: '13 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },

//   {
//     id: 10,
//     ConnectionType: 'Oracle',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '2 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 11,
//     ConnectionType: 'Kakfa',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '2 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },

//   {
//     id: 12,
//     ConnectionType: 'Oracle',
//     DatasetName: 'CarSales_USA',
//     FileFormat: 'Avro',
//     Schema: '8 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 13,
//     ConnectionType: 'MySQL',
//     DatasetName: 'adipiscing elit proin interdum mauris non',
//     FileFormat: 'CSV',
//     Schema: '7 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 14,
//     ConnectionType: 'Oracle',
//     DatasetName: 'eget nunc donec quis orci eget orci',
//     FileFormat: 'CSV',
//     Schema: '6 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 15,
//     ConnectionType: 'Kakfa',
//     DatasetName: 'eu nibh quisque id justo sit',
//     FileFormat: 'Parquet',
//     Schema: '6 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 16,
//     ConnectionType: 'BigQuery',
//     DatasetName: 'penatibus et magnis dis parturient montes nascetur',
//     FileFormat: 'Avro',
//     Schema: '7 columns',
//     LastUpdated: '04 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '01 days ago ',
//     Wrangler: 'Wrangler',
//   },
// ];

// const MaterialTable = () => {
//   return (
//     <div style={{ height: 708, width: 1054 }}>
//       <StyledDataGrid rows={rows} columns={columns} pageSize={13} rowsPerPageOptions={[16]} />
//     </div>
//   );
// };
// // export default MaterialTable;
// import React from 'react';

// const MaterialTable = () => {
//   return <div>hy</div>;
// };
// import React from 'react';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { styled } from '@mui/system';

// const StyledDataGrid = styled(DataGrid)({
//   '&.MuiDataGrid-root': {
//     border: 'none',
//   },
//   '& .MuiSvgIcon-root': {
//     display: 'none',
//   },
//   '& .MuiDataGrid-columnHeaderTitle': {
//     fontWeight: '400',
//   },
//   '& .MuiDataGrid-cellContent': {
//     color: '#5F6368',
//     fontSize: '14px',
//   },
//   '& .MuiDataGrid-columnHeaders': {
//     borderBottom: '1px solid #5F6368',
//   },
//   '& .MuiTableRow-root:hover': {
//     backgroundColor: 'black',
//   },
// });

// const columns: GridColDef[] = [
//   { field: 'DatasetName', headerName: 'Dataset Name', width: 148 },
//   {
//     field: 'FileFormat',
//     headerName: 'File Format',

//     width: 123,
//   },
//   {
//     field: 'Schema',
//     headerName: 'Schema',
//     width: 127,
//   },
//   {
//     field: 'LastUpdated',
//     headerName: 'Last Updated ',

//     width: 138,
//   },
//   {
//     field: 'ConnectionName',
//     headerName: 'Connection Name',

//     width: 202,
//   },
//   {
//     field: 'ConnectionStatus',
//     headerName: 'Connection Status',

//     width: 215,
//   },
//   {
//     field: 'Wrangler',
//     headerName: '',

//     width: 215,
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     ConnectionType: 'Oracle',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '7 columns',
//     LastUpdated: '02 hrs ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '02 hrs ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 2,
//     ConnectionType: 'GCS',
//     DatasetName: 'CarSales_India',
//     FileFormat: 'CSV',
//     Schema: '1 columns',
//     LastUpdated: '02 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '03 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 3,
//     ConnectionType: 'Kakfa',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '2 columns',
//     LastUpdated: '04 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '21 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 4,
//     ConnectionType: 'BigQuery',
//     DatasetName: 'CarSales_India',
//     FileFormat: 'Avro',
//     Schema: '1 columns',
//     LastUpdated: '05 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '03 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 5,
//     ConnectionType: 'Oracle',
//     DatasetName: 'CarSales_USA',
//     FileFormat: 'Table',
//     Schema: '9 columns',
//     LastUpdated: '07 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '21 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 6,
//     ConnectionType: 'GCS',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '5 columns',
//     LastUpdated: '08 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 7,
//     ConnectionType: 'BigQuery',
//     DatasetName: 'CarSales_USA',
//     FileFormat: 'Table',
//     Schema: '8 columns',
//     LastUpdated: '07 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '02 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 8,
//     ConnectionType: 'BigQuery',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '1 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '02 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 9,
//     ConnectionType: 'GCS',
//     DatasetName: 'CarSales_USA',
//     FileFormat: 'CSV',
//     Schema: '3 columns',
//     LastUpdated: '13 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },

//   {
//     id: 10,
//     ConnectionType: 'Oracle',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '2 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 11,
//     ConnectionType: 'Kakfa',
//     DatasetName: 'Sales_Cali_Aug',
//     FileFormat: 'Avro',
//     Schema: '2 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'S3-customers',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },

//   {
//     id: 12,
//     ConnectionType: 'Oracle',
//     DatasetName: 'CarSales_USA',
//     FileFormat: 'Avro',
//     Schema: '8 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 13,
//     ConnectionType: 'MySQL',
//     DatasetName: 'adipiscing elit proin interdum mauris non',
//     FileFormat: 'CSV',
//     Schema: '7 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 14,
//     ConnectionType: 'Oracle',
//     DatasetName: 'eget nunc donec quis orci eget orci',
//     FileFormat: 'CSV',
//     Schema: '6 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 15,
//     ConnectionType: 'Kakfa',
//     DatasetName: 'eu nibh quisque id justo sit',
//     FileFormat: 'Parquet',
//     Schema: '6 columns',
//     LastUpdated: '10 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '05 days ago',
//     Wrangler: 'Wrangler',
//   },
//   {
//     id: 16,
//     ConnectionType: 'BigQuery',
//     DatasetName: 'penatibus et magnis dis parturient montes nascetur',
//     FileFormat: 'Avro',
//     Schema: '7 columns',
//     LastUpdated: '04 days ago',
//     ConnectionName: 'BigQ-Sales-connection',
//     ConnectionStatus: '01 days ago ',
//     Wrangler: 'Wrangler',
//   },
// ];
// const handleClick = (e) => {
//   console.log(e);
// };
// const MaterialTable = () => {
//   return (
//     <div style={{ height: 708, width: 1054 }}>
//       <StyledDataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={13}
//         rowsPerPageOptions={[16]}
//         onCellClick={(e) => {
//           handleClick(e);
//         }}
//       />
//     </div>
//   );
// };
// export default MaterialTable;
