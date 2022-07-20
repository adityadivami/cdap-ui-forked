import React, { useEffect, useState } from 'react';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box, styled } from '@material-ui/core';
import MUILink from '@material-ui/core/Link';
import CachedIcon from '@material-ui/icons/Cached';
import { getCurrentNamespace } from 'services/NamespaceStore';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: '35px',
    maxWidth: '1114px',
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  table: {
    maxWidth: '1054px',
  },
  tableHeaderCell: {
    minWidth: '120px',
    padding: '0px 0px 9px 10px',
    borderBottom: '1px solid #5F6368',
    marginRight: '50px !important',
    fontSize: '14px',
    lineHeight: '21px',
  },
  tableRowCell: {
    minWidth: '120px',
    fontSize: '14px',
    lineHeight: '21px',
    padding: '15px 0px 15px 10px',
    paddingLeft: '10px',
    borderBottom: '1px solid #E0E0E0',
    color: '#5F6368',
    '& > :nth-last-child(1)': {
      minWidth: '150px',
    },
    boxSizing: 'content-box',
  },
  tableRow: {
    paddingLeft: '10px',
    minHeight: '51px',
    '&:hover': {
      backgroundColor: '#EFF0F2',
    },
  },
  link: {
    marginRight: '10px',
    fontSize: '14px',
    fontWeight: 400,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  wrangleBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '30px',
    minWidth: '150px',
  },
  onlineIndicator: {
    height: '8px',
    width: '8px',
    minWidth: '8px !important',
    maxWidth: '8px !important',
    backgroundColor: 'green',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '10px',
  },
  offlineIndicator: {
    height: '8px',
    width: '8px',
    minWidth: '8px !important',
    maxWidth: '8px !important',
    backgroundColor: '#fff',
    border: '1px solid #000000',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '10px',
  },
}));

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

const DataTable = (props) => {
  const { datasetList } = props;

  const [rows, setSelectedRow] = useState([]);

  useEffect(() => {
    if (datasetList) {
      console.log(datasetList, 'datasetList combined');
      setSelectedRow(
        datasetList.map((dataset, datasetIndex) => {
          return createData(
            datasetIndex,
            dataset.name,
            dataset.type,
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
  const handleMouseLeave = (event, id) => {
    const selectedRowIndex = rows.findIndex((row) => row.id === id);
    const newRows = [...rows];
    newRows[selectedRowIndex].showWrangle = false;
    setSelectedRow(newRows);
  };
  const handleMouseEnter = (event, id) => {
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
