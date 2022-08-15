import { makeStyles } from '@material-ui/styles';
import { None } from 'vega-util';

export const useStyles = makeStyles({
  boxStyles: {
    width: '280px',
    borderRight: '1px dashed #DADCE0',
    zIndex: 1,
  },
  tabIndicatorStyles: {
    backgroundColor: '#4681F4',
    color: 'red !important',
    width: '280px',
    zIndex: 2,
  },
  labelsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '4px',
  },
  labelStyles: {
    maxWidth: '280px',
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
    display: 'flex',
    justifyContent: 'space-between',
    gap: '4px',
    // background: 'red',
  },
  labelStylesCanSample: {
    maxWidth: '145px',
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tabsContainer: {
    display: 'flex',
  },
});
