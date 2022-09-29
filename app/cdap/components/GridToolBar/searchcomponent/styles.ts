import { makeStyles } from '@material-ui/core';

export const useCss = makeStyles({
  searchResultBox: {
    position: 'absolute',
    top: '47px',
    left: '0',
    right: '0',
    background: 'white',
    padding: '15px',
    overflowX: 'scroll',
    width: '490px',
    height: '450px',
    border: '1px solid #DADCE0',
    boxShadow: '3px 4px 15px rgba(68, 132, 245, 0.15)',
  },
  txtStyles: {
    fontWeight: 400,
    fontSize: '20px',
    color: '#212121',
    marginBottom: '0px',
  },
  options: {
    fontWeight: 500,
    fontSize: '14px',
    color: '#212121',
    marginBottom: 0,
    marginTop: '5px',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  val: {
    fontWeight: 500,
    fontSize: '14px',
    color: '#616161',
    marginBottom: '5px',
  },
});
