import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  dismissBox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh'
  },
  container: {
    backgroundImage:
      'linear-gradient(to right bottom, transparent, #7a7a7a7a, #7a7a7a7a, transparent)',
    border: '0.5px solid #ffffff7a',
    backdropFilter: 'blur(2px)',
    minWidth: '150px',
    padding: '5px 0',
    borderRadius: '10px',
    zIndex: 2000,
    marginTop: '15px'
  },
  subContainer: {
    background: '#fff',
    width: '320px',
    padding: '5px 0',
    borderRadius: '10px',
    zIndex: 2000,
    marginLeft: '20px'
  },
  popper: {
    zIndex: 2000
  },
  listItemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dropdownMenuArea: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: '13px',
    lineHeight: '24px',
    color: '#fff',
    cursor: 'pointer'
  }
}));

export default useStyles;
