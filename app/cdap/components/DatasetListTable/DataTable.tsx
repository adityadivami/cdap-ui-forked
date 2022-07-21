import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import MUILink from '@material-ui/core/Link';
import CachedIcon from '@material-ui/icons/Cached';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentNamespace } from 'services/NamespaceStore';
import { useStyles } from './styles';
import { IdatatableProps, Idatatable } from './types';

function createData(
  id: number,
  name: string,
  fileFormat: string = 'CSV',
  schema: number = 4,
  lastUpdated: number = 20,
  connectionName: string = 'BigQ-Sales-connection',
  connectionStatus: string = 'online',
  lastAvailable: number = 10,
  showWrangle: boolean = false
) {
  return {
    id,
    name,
    fileFormat,
    schema,
    lastUpdated,
    connectionName,
    connectionStatus,
    lastAvailable,
    showWrangle,
  };
}

const OnlineIndicator = ({ classes }) => <span className={classes.onlineIndicator}></span>;
const OfflineIndicator = ({ classes }) => <span className={classes.offlineIndicator}></span>;

const RefreshIcon = styled(CachedIcon)({
  display: 'inline',
  marginLeft: '20px',
  cursor: 'pointer',
  '& :hover': {
    fontSize: 'large',
    color: 'blueviolet',
  },
});

const DataTable: React.FC<IdatatableProps> = (props) => {
  const { datasetList } = props;

  const [rows, setSelectedRow] = useState([]);

  useEffect(() => {
    if (datasetList) {
      setSelectedRow(
        datasetList.map((dataset, datasetIndex) => {
          return createData(
            datasetIndex,
            dataset.name,
            'CSV',
            4,
            4,
            dataset.connectionsName,
            'online',
            4,
            false
          );
        })
      );
    }
  }, [datasetList]);

  const classes = useStyles();
  const handleMouseLeave = (event, id: number) => {
    const selectedRowIndex = rows.findIndex((row) => row.id === id);
    const newRows = [...rows];
    newRows[selectedRowIndex].showWrangle = false;
    setSelectedRow(newRows);
  };
  const handleMouseEnter = (event, id: number) => {
    const selectedRowIndex = rows.findIndex((row) => row.id === id);
    const newRows = [...rows];
    newRows[selectedRowIndex].showWrangle = true;
    setSelectedRow(newRows);
  };

  const headersList = [
    'Dataset name',
    'File format',
    'Schema',
    'Last updated',
    'Connection name',
    'Connection Status',
    ' ',
  ];

  return (
    <TableContainer component={Box} className={classes.tableContainer}>
      <Table aria-label="simple table" className={classes.table}>
        <TableHead>
          <TableRow>
            {headersList.map((header) => (
              <TableCell className={classes.tableHeaderCell}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              className={classes.tableRow}
              onMouseEnter={(event) => handleMouseEnter(event, row.id)}
              onMouseLeave={(event) => handleMouseLeave(event, row.id)}
            >
              <TableCell className={classes.tableRowCell}>{row.name}</TableCell>
              <TableCell className={classes.tableRowCell}>{row.fileFormat}</TableCell>
              <TableCell className={classes.tableRowCell}>
                {row.schema}
                {' Columns'}
              </TableCell>
              <TableCell className={classes.tableRowCell}>
                {row.lastUpdated}
                {' days ago'}
              </TableCell>
              <TableCell className={classes.tableRowCell}>{row.connectionName}</TableCell>
              <TableCell className={classes.tableRowCell}>
                <Box>
                  {row.connectionStatus === 'online' ? (
                    <OnlineIndicator classes={classes} />
                  ) : (
                    <OfflineIndicator classes={classes} />
                  )}
                  {row.lastAvailable}
                  {' days ago'}
                  {row.showWrangle && <RefreshIcon />}
                </Box>
              </TableCell>
              <TableCell className={classes.tableRowCell}>
                <Box className={classes.wrangleBox}>
                  {row.showWrangle && (
                    <Link to={`/ns/${getCurrentNamespace()}/workspace-data/${'xyz'}`}>
                      <MUILink className={classes.link} component="button" variant="body2">
                        Wrangle
                      </MUILink>
                    </Link>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;
