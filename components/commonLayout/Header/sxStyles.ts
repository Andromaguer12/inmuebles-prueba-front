import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  paper: {
    background: 'transparent',
    boxShadow: 'none',
    backgroundImage:
      'linear-gradient(to right bottom, transparent, #7a7a7a7a, #7a7a7a7a, transparent)',
    borderLeft: '0.5px solid #ffffff7a',
    backdropFilter: 'blur(2px)',
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemTexts: {
    fontSize: '14px',
    fontFamily: 'Source Code Pro',
    color: '#fff'
  },
  socialButtonsResponsive: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '10px'
  }
});

export default useStyles;
