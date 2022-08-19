import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  boxStyles: {
    width: '300px',
    borderRight: '1px dashed #DADCE0',
    zIndex: 1,
    height: '100%',
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
  canBrowseHover: {
    display: 'none',
  },
  tabsContainer: {
    '& .MuiTabs-scroller': {
      '& .MuiButtonBase-root.Mui-selected': {
        color: '#fff',
        '& .canBrowseHover': {
          display: 'inline',
        },
        '& .canBrowseNormal': {
          display: 'none',
        },
      },
    },
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
        gap: '10px',
      },
    },
    '&>.MuiBox-root': {
      display: 'none',
    },
  },
  wrangleTab: {
    '&:hover': {
      backgroundColor: '#EFF0F2',
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
  tabsContainerWithHeader: {
    display: 'flex',
    flexDirection: 'column',
  },
  tabHeaders: {
    width: '300px',
    backgroundColor: '#F1F8FF',
  },
  StyleForLevelZero: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '53px',
    borderRight: '1px dashed #DADCE0',
  },
  beforeSearchIconClickDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '53px',
    borderRight: '1px dashed #DADCE0',
    paddingRight: '18px',
    paddingLeft: '30px',
  },
  hideComponent: {
    display: 'none',
  },
});
