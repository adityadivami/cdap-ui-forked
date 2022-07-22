import { makeStyles } from '@material-ui/styles';
import { None } from 'vega-util';
export const useStyles = makeStyles({
  boxStyles: {
    width: '252px',
    background: 'linear-gradient(180deg, rgba(243, 246, 249, 0) -0.07%, #F3F6F9 22.66%)',
    borderRight: '1px dashed #DADCE0',
    zIndex: 1,
  },
  tabIndicatorStyles: {
    backgroundColor: 'white',
    minWidth: '252.24px',
    borderWidth: '3px',
    borderStyle: 'solid',
    borderImage: 'linear-gradient(to left, #4681F4, 2%,white,white,white,white,white,white) 1',
    zIndex: 2,
  },
  labelsContainer: {
    display: 'flex',
    gap: '4px',
  },
  labelStyles: {
    maxWidth: '145px',
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
});
