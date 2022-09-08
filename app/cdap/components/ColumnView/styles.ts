import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    tableNamesList: {
      border: '2px solid red',
    },
    addTransformationBodyStyles: {
      height: 'calc(100% - 100px)',
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
    },
    customTableContainer: {
      overflowX: 'initial',
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
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
    },
    functionInfoSectionStyles: {
      display: 'flex',
      alignItems: 'center',
    },
    functionTextStyles: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
    },
    infoIconTextStyles: {
      marginLeft: '5px',
      width: '20px',
      height: '20px',
    },
    greenCheckIconStyles: {
      width: '20px',
      height: '20px',
    },
    quickSelectTextStyles: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
      marginTop: '10px',
    },
    selectButtonStyles: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '26px',
      letterSpacing: '0.46px',
      color: '#4681F4;',
      textTransform: 'none',
      marginTop: '15px',
    },

    selectColumnsHeaderStyles: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    recipeStepsTableHeadStyles: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
    },
    recipeStepsTableRowStyles: {
      fontFamily: 'Noto Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.15px',
      color: '#5F6368',
    },
    recipeStepsTableBodyRowStyles: {
      '&:hover': {
        background: '#EFF0F2',
        '& td:last-child': {
          visibility: 'visible',
        },
      },
    },
    recipeStepsActionTypeStyles: {
      fontWeight: 600,
    },
    displayNone: {
      visibility: 'hidden',
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
  };
});
