import { makeStyles } from '@material-ui/core';

export const useCss = makeStyles({
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderColor: '#9B9B9B',
    height: '48px',
    marginTop: '0px',
    padding: '10px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '0px',
    marginRight: '0px',
  },
  searchIcon: {
    border: 'none',
    outline: 'none',
  },
});
