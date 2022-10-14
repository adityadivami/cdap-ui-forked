import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    columnInsightsTopSection: {
      paddingBottom: '20px',
      borderBottom: '1px solid #E0E0E0',
    },
    columnInsightsColumnName: {
      display: 'flex',
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#212121',
      marginTop: '5px',
      gap: '12px',
    },
    selectFieldStyles: {
      width: '350px',
      height: '40px',
      background: '#FFFFFF',
      border: '1px solid #DADCE0',
      borderRadius: '4px',
      padding: '5px 15px',
      fontFamily: 'Noto Sans',
      fontSize: '14px',
      marginTop: '10px',

      '&:before': {
        display: 'none',
      },

      '&:focus-visible': {
        outline: 'none !important',
      },

      '&:after': {
        display: 'none',
      },
    },
    optionStyles: {
      fontFamily: 'Noto Sans',
      fontSize: '14px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#000000',
    },
    selectIconStyles: {
      top: 'calc(50% - 10px)',
      right: '10px',
    },
    selectStyles: {
      '&:focus': {
        'background-color': 'transparent',
      },
    },
    columnInsightsDetailsWrapper: {
      marginTop: '20px',
    },
    columnInsightsDetailsCount: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#212121',
    },
    columnInsightsDetailsCountSection: {
      display: 'flex',
      alignItems: 'center',
    },
    dividerLineStyles: {
      width: 1,
      height: 13,
      backgroundColor: '#DADCE0',
      margin: '0 15px',
    },
    columnInsightsDetailsCountDescription: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#212121',
      marginTop: '8px',
    },
  };
});
