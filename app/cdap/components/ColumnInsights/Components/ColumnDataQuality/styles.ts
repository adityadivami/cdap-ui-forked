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
    qualityBar: {},
    filled: {
      backgroundColor: '#4BAF4F',
      display: 'inline-block',
      height: '5px',
      border: '1px solid #4BAF4F',
      borderRadius: 10,
      // borderTopLeftRadius: 10,
      // borderBottomLeftRadius: 10,
    },

    empty: {
      backgroundColor: '#E53935',
      display: 'inline-block',
      height: '5px',
      border: '1px solid #E53935',
      // borderTopRightRadius: 10,
      // borderBottomRightRadius: 10,
      borderRadius: 10,
    },
  };
});
