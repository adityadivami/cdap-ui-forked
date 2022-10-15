import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    columnInsightsDataQualityTopSection: {
      padding: '20px 0',
      borderBottom: '1px solid #E0E0E0',
    },
    columnInsightsColumnName: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#212121',
      marginTop: '5px',
    },
    columnDataQualityValuesButtons: {},
    dataQualityCard: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgb(255, 255, 255)',
      justifyContent: 'center',
      filter: 'drop-shadow(0px 2px 4px rgba(68, 132, 245, 0.25))',
      borderRadius: '4px',
      marginTop: '20px',
    },
    missingCountBox: {
      border: '1px solid #DADCE0',
      width: '50%',
      textAlign: 'center',
      padding: '10px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    invalidCountBox: {
      width: '50%',
      textAlign: 'center',
      padding: '10px',
      border: '1px solid #DADCE0',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    missingText: {
      color: '#212121',
      fontSize: '14px',
      fontWeight: 400,
      fontStyle: 'normal',
      fontFamily: 'Noto Sans',
    },
    invalidText: {
      color: '#E97567',
      fontSize: '14px',
      fontWeight: 400,
      fontStyle: 'normal',
      fontFamily: 'Noto Sans',
    },
    isSelected: {
      background: '#F3F6F9',
      border: '1px solid #3994FF',
      boxShadow: 'inset 2px 2px 2px rgba(68, 132, 245, 0.4)',
    },
  };
});
