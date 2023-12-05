import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  title: {
    fontSize: 14
  },
  subheader: {
    fontSize: 12
  },
  cardContainer: { 
    maxWidth: 313, 
    minWidth: 313, 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between',
    marginBottom: '20px',
    '@media screen and (max-width: 712px)': {
      maxWidth: '90%', 
      minWidth: '90%',
      margin: '0 auto',
      marginBottom: '20px',
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '2.5px 0'
  },
  card: {
    width: 'fit-content',
    background: '#e7e7e7',
    borderRadius: '10px',
    fontSize: '10px',
    padding: '0 5px',
    marginRight: '5px',
    marginBottom: '5px'
  },
  title2: {
    fontSize: '18px',
    maxHeight: '280px',
    overflow: 'auto',
    paddingRight: '10px',
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    }
  },
  price: {
    fontSize: '15px',
    fontWeight: 800,
    color: '#000',
    fontFamily: 'Source Code Pro',
    margin: '5px 0'
  },
  squareMeters: {
    fontSize: '12px',
    fontWeight: 800,
    color: '#000',
    fontFamily: 'Montserrat',
  },
  projectTypes: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  image: {
    minWidth: '300px'
  },
});
