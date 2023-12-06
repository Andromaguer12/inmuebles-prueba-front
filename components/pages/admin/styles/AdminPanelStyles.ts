import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  container: {
    width: '100%',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
    background: 'linear-gradient(to top right, #0d2c43, #1769a8)'
  },
  header: {
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    paddingTop: '0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoAndSearch: {
    width: '100px',
    height: '100px',
  },
  image: {
    width: '100%',
    height: 'auto'
  },
  title: {
    color: "#fff"
  },
  subtitle: {
    color: "#fff"
  },
  subBox: { 
    width: '100%', 
    height: '600px', 
    alignItems: 'center', 
    justifyContent: 'center', 
    display: 'flex', 
    flexDirection: 'column', 
    mb: 2 
  }
});