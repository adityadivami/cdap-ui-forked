import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
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
    searchFormControl: {
      position: 'relative',
      display: 'flex',
      marginRight: '16px',
    },
    searchInputAdornment: {
      zIndex: 0,
      cursor: 'pointer',
      position: 'absolute',
      right: 0,
    },
    isFocused: {
      border: 'none',
      borderBottom: '1px solid grey',
      outline: 'none',
    },
    isBlurred: {
      border: 'none',
      borderBottom: '1px solid transparent',
    },
  };
});
