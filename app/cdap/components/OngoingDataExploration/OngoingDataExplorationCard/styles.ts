import { makeStyles } from '@material-ui/core';

export const explorationCardStyles = makeStyles({
  explorationCardStyles: {
    minHeight: '209px',
    minWidth: '279px',
    background: 'linear-gradient(180deg, rgba(75, 175, 79, 0.08) 0%, rgba(75, 175, 79, 0) 50%)',
    boxShadow: 'none',
    border: '1px solid #DADCE0',
    borderRadius: '4px',
    padding: '28px 25px 16px 25px',
  },
  datasetName: {
    lineHeight: '24px',
    fontSize: '16px',
  },
  datasetDetails: {
    color: 'rgba(95, 99, 104, 1)',
    lineHeight: '24px',
    fontSize: '16px',
  },
  cardContent: {
    padding: '0px',
  },
  cardFooter: {
    display: 'flex',
    gap: '10px',
  },
  linearProgressBarContainer: {
    padding: '12px 5px 36px 5px',
  },
  '& .MuiCardContent-root:last-child': {
    paddingBottom: '0px',
  },
});
