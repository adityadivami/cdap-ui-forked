import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    headingStyles: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
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
  };
});
