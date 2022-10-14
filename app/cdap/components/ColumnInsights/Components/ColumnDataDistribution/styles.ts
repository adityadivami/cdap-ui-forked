import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    columnInsightsDataQualityTopSection: {
      padding: '20px 0',
    },
    columnInsightsColumnName: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#212121',
    },
    columnDataQualityValuesButtons: {},
    columnDataQualityGraph: {
      '& .axis': {
        display: 'none',
      },

      '& .bar': {
        fill: '#3994FF',
      },

      '& .graph': {
        transform: 'translate(0px, 20px) !important',
      },
    },
    distributionHeadBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonText: {
      color: '#2196F3',
      fontSize: '14px',
      textTransform: 'capitalize',
    },
  };
});
