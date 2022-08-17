import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  boxStyles: {
    width: '300px',
    borderRight: '1px dashed #DADCE0',
    zIndex: 1,
  },
  tabIndicatorStyles: {
    backgroundColor: '#3994FF',
    color: 'white !important',
    width: '300px',
    zIndex: 2,
  },
  indicator: {
    color: '#fff',
  },
  labelsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '4px',
  },
  canBrowseIconNormal: {
    display: 'block',
  },

  tabsContainer: {
    '& .MuiTabs-scroller': {
      '& .MuiButtonBase-root.Mui-selected': {
        color: '#fff',
      },
    },
    // '& .MuiButtonBase-root.MuiTab-root:hover': {
    //   border: '2px solid black',
    //   '& .MuiTab-wrapper': {
    //     border: '2px solid green',
    //     '& .arrowIcon': {
    //       border: '2px solid red',
    //       '&.arrowIcon': {
    //         '&.canBrowseIconHover': {
    //           display: 'block',
    //           border: '2px solid green',
    //         },
    //       },
    //     },
    //   },
    // },
  },
  labelStyles: {
    maxWidth: '300px',
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  iconBoxStyles: {
    width: 30,
    height: 30,
    boxSizing: 'border-box',
  },
  tooltipStyles: {
    backgroundColor: 'black',
    color: 'white',
  },

  labelsContainerCanSample: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '4px',
    '&:hover': {
      '&>.MuiBox-root': {
        display: 'flex',
        justifyContent: 'space-between',
      },
    },
    '&>.MuiBox-root': {
      display: 'none',
    },
  },
  labelStylesCanSample: {
    maxWidth: '145px',
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  labelContainerBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  canBrowseIconHover: {
    display: 'none',
  },
  arrowIcon: {
    color: 'white',
  },
});
