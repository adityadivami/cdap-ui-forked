import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    tableNamesList: {
      border: '2px solid red',
    },
    tableHead: {
      marginTop: '40px',
    },
    tableBody: {
      '& .MuiTableCell-root': {
        color: '#5F6368',
        fontSize: '14px',
      },
    },
    tableRowContainer: {
      '& .MuiTableCell-root': {
        paddingTop: '10px',
        paddingBottom: '10px',
      },
      '&:hover': {
        boxShadow: '3px 4px 15px rgba(68, 132, 245, 0.15)',
      },
    },
    headerNamesSeparator: {
      width: '250px',
      border: '1px solid red',
      height: '1px',
    },
    addTransformationBodyStyles: {
      height: 'calc(100% - 100px)',
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
    },
    customTableContainer: {
      overflowX: 'initial',
      padding: 0,
    },
    columnsCountTextStyles: {
      width: '100%',
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
      paddingBottom: '15px',
      height: 'calc(100vh - 246px)',
      overflow: 'scroll',
    },
    functionSectionStyles: {
      padding: '15px 0',
      borderBottom: '1px solid #DADCE0',
    },
    funtionSectionWrapperStyles: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    functionHeadingTextStyles: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#212121',
    },
    columnLeft: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      paddingLeft: '30px',
    },
    columnRight: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      paddingLeft: '0px',
      // '& .MuiTableCell-root': {
      //   padding: '10px 0px 10px 0px',
      // },
    },
    recipeStepsTableRowStyles: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
    },
    nullValuesContainer: {
      width: '134px',
      paddingLeft: '0px',
    },
    recipeStepsDeleteStyles: {
      width: '18px',
      height: '20px',
      cursor: 'pointer',
      //   padding: '15px 10px',
    },
    radioStyles: {
      '& span:last-child': {
        fontFamily: 'Noto Sans',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        color: '#5F6368',
      },
    },
    replaceWithInput: {
      width: '90%',
    },
    replaceWithText: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      color: '#5F6368',
    },
    leftSideCell: {
      paddingLeft: '30px',
      '& .MuiTableCell-root': {
        padding: '10px 0px 10px 30px',
      },
    },
  };
});
