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
  containerWrapper: {
    height: '62.96px',
    width: '392.27px',
    padding: '10px',
  },
  paddingLeftt: {
    paddingLeft: '0px',
  },

  marginTopp: {
    marginTop: '15px',
  },
  weight40: {
    fontWeight: 400,
    fontSize: '16px',
    color: '#000000',
    marginTop: '11px',
    marginRight: '25px',
  },

  weight400: {
    fontWeight: 400,
    fontSize: '14px',
    color: '#5F6368',
    marginTop: '0px',
    marginBottom: '2px',
    marginRight: '65px',
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
    width: '392.27px',
    marginTop: '48px',
    height: '100%',
  },
  paddingDiv: {
    padding: '10px',
  },
  paddingDivv: {
    padding: '5px',
  },
  iconStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxShadoww: {
    boxSizing: 'border-box',
    boxShadow: '3px 4px 15px rgba(68, 132, 245, 0.15)',
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
  flexOnly: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexHeight: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  footerButton: {
    backgroundColor: '#3994FF !important',
    boxShadow: '0px 2px 4px rgba(70, 129, 244, 0.15)',
    borderRadius: '4px',
    color: '#fff !important',
    width: '162px',
  },
});
