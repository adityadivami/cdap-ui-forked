import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  rightContainerStyles: {
    minWidth: '746px',

    padding: '60px 40px 75px 60px',
  },
  dataExplorationHeader: {
    fontSize: '18px',
    lineHeight: '150%',
    fontWeight: 400,
  },
  underLine: {
    lineHeight: '2px',
  },
  dataExplorationCardContainer: {
    marginTop: '21px',
    display: 'flex',
    gap: '20px',
    cursor: 'pointer',
  },
  viewAllOngoingWorkspaceLink: {
    fontSize: '14px',
    lineHeight: '21px',
    color: '#4681F4',
    marginTop: '20px',
    display: 'flex',
    gap: '8px',
    alignItems: 'centre',
  },
  rightArrowIconStyle: {
    display: 'flex',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  '& .MuiPaper-elevation1': {
    boxShadow: 'none',
  },
});
