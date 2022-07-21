import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
