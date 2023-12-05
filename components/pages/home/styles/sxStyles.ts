import { SxProps, Theme } from '@mui/material';

export const styles = {
  landingButtons: {
    borderWidth: '2px',
    marginRight: '20px',
    '&:hover': {
      borderWidth: '2px'
    },
    '@media screen and (max-width: 880px)': {
      marginTop: '10px'
    }
  } as SxProps<Theme>,
  socialLinks: {
    width: '49%',
    padding: '15px',
    borderWidth: '2px',
    marginBottom: '10px',
    '&:hover': {
      borderWidth: '2px'
    }
  } as SxProps<Theme>,
  icons: {
    marginRight: '10px',
    fontSize: '17px'
  } as SxProps<Theme>,
  iconCopy: {
    fontSize: '20px',
    color: '#fff'
  } as SxProps<Theme>
};
