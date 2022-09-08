import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    paper: {
      top: '46px',
    },
    drawerContainerStyles: {
      width: 389,
      borderTop: '1px solid #3994FF',
    },
    headerStyles: {
      height: '60px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headingStyles: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    pointerStyles: {
      cursor: 'pointer',
    },
    headingTextStyles: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 20,
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#000000',
    },
    headerRightStyles: {
      display: 'flex',
      alignItems: 'center',
    },
    dividerLineStyles: {
      width: 1,
      height: 28,
      marginRight: '12px',
      backgroundColor: '#DADCE0',
    },
    headerTextWithBackIconStyles: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '30px',
    },
    headerBackIconStyles: {
      width: '10px',
      height: '20px',
    },
    searchIconContainer: {
      marginRight: '16px',
      fontSize: '18px',
    },
  };
});
