import { makeStyles } from '@material-ui/core';
export const useDrawerCss = makeStyles({
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexBetweenBaseLine: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
  },
  weight40: {
    fontWeight: 400,
    fontSize: '16px',
    color: '#5F6368',
    marginBottom: '5px',
    marginTop: '20px',
  },
  weight400: {
    fontWeight: 400,
    fontSize: '14px',
    color: '#5F6368',
    marginBottom: '5px',
  },
  weight600: {
    fontWeight: 600,
    fontSize: '16px',
    color: '#5F6368',
    marginBottom: '5px',
  },
  headerTitle: {
    fontWeight: 400,
    fontSize: '20px',
    color: '#000000',
  },
  drawerContentWrapper: {
    padding: '20px 10px',
    width: '460px',
    marginTop: '48px',
    height: '100%',
  },
  paddingDiv: {
    padding: '10px',
  },
  buttonOutlined: {
    borderColor: '#4681F4',
    color: '#4681F4',
    marginTop: '10px',
  },
  replaceInput: {
    display: 'block',
    border: '1px solid #DADCE0',
    borderRadius: '4px',
    width: '100%',
    height: '2.5rem',
  },
  flexHeight: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  marginSide: {
    marginLeft: '10px',
    marginRight: '10px',
  },
  footerButton: {
    backgroundColor: '#3994FF !important',
    boxShadow: '0px 2px 4px rgba(70, 129, 244, 0.15)',
    borderRadius: '4px',
    color: '#fff !important',
    width: '162px',
  },
});
