import { makeStyles } from '@material-ui/core/styles';

export const useConnectorTypesComponentStyles = makeStyles(() => ({
  welcomeCardContainer: {
    display: 'flex',
  },
  welcomeTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: '36px',
  },
  welcomeText: {
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '36px',
  },
  flexContainer: {
    marginTop: '17px',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    background: 'transparent',
    '& > :nth-child(3n+1)': {
      borderRight: '1px solid #E3E3E3',
      borderBottom: '1px solid #E3E3E3',
      // width: '160px',
    },
    '& > :nth-child(3n+2)': {
      borderBottom: '1px solid #E3E3E3',
      // width: '180px',
    },
    '& > :nth-child(3n)': {
      borderLeft: '1px solid #E3E3E3',
      borderBottom: '1px solid #E3E3E3',
      // width: '160px',
    },
    '& > :nth-last-child(1)': {
      borderBottom: '0px',
    },
    '& > :nth-last-child(2)': {
      borderBottom: '0px',
    },
    '& > :nth-last-child(3)': {
      borderBottom: '0px',
    },
  },
  dashBoard: {
    padding: '18px 59px 18px 60px',
    maxWidth: '620px',
    border: '0px',
    borderRight: '1px dashed #DADCE0',
    backgroundImage: 'linear-gradient(180deg, rgba(243, 246, 249, 0) -0.07%, #F3F6F9 22.66%)',
  },
  linkLine: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none !important',
    },
  },
  subTitle: {
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '27px',
    marginTop: '64px',
  },
  underLine: {
    lineHeight: '2px',
  },
  cardWrapper: {
    width: '166px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '0px',
    margin: '0px',
    padding: '0px',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      boxShadow: '3px 4px 15px rgba(68, 132, 245, 0.15)',
    },
  },
  wrangleCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectorTypeName: {
    fontSize: '14px',
    lineHeight: '21px',
    fontWeight: 400,
    letterSpacing: '0.15px',
    marginTop: '7px',
    textDecoration: 'none !important',
    color: '#000000',
  },
}));
