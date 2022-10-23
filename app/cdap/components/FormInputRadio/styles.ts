import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => {
  return {
    radioStyles: {
      marginLeft: '-5px',
      '& span:last-child': {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        color: '#5F6368',
      },
    },
  };
});
