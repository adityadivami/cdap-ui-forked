import { makeStyles } from '@material-ui/styles';
import React from 'react';

export const useStyles = makeStyles({
  wrapper: {
    marginLeft: '80px', // need to be removed
    marginTop: '80px',
    marginRight: '80px',
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
  },
  card: {
    height: '180px',
    width: '220px',
    border: '1px solid #E3E3E3',
    borderRadius: '10px',
    boxShadow: 'none',
    display: 'flex',
    '&:hover': {
      boxShadow: '3px 4px 15px rgba(68, 132, 245, 0.15)',
      border: 'none',
      boxSizing: 'border-box',
    },
  },
  cardContent: {
    width: '100%',
    display: 'flex',
    paddingBottom: '47px',
    placeSelf: 'flex-end',
    margin: '0 auto',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardText: {
    marginTop: '15px',
    letterSpacing: '0.15px',
    lineHeight: '30px',
    fontSize: '20px',
  },
});
