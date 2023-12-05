import { createTheme } from '@mui/material/styles';

const typography = {
  fontFamily: ["'Montserrat', sans-serif"].join(','),
  fontSize: 16,
  letterSpacing: '-0.04em',
  h1: {
    fontStyle: 'normal',
    fontSize: '56px',
    lineHeight: '1.2em',
    fontWeight: 700
  },

  h2: {
    fontStyle: 'normal',
    fontSize: '50px',
    lineHeight: '1em',
    fontWeight: 700
  },

  h3: {
    fontStyle: 'normal',
    fontSize: '44px',
    lineHeight: '1em',
    fontWeight: 700
  },

  h4: {
    fontStyle: 'normal',
    fontSize: '40px',
    lineHeight: '1em',
    fontWeight: 700
  },

  h5: {
    fontStyle: 'normal',
    fontSize: '30px',
    lineHeight: '39px',
    fontWeight: 700
  },

  h6: {
    fontStyle: 'normal',
    fontSize: '28px',
    lineHeight: '30px',
    fontWeight: 300
  },

  subtitle1: {
    fontStyle: 'normal',
    fontSize: '24px',
    lineHeight: '18px',
    fontWeight: 300
  },

  subtitle2: {
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '18px',
    fontWeight: 700
  },

  body1: {
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 400
  },

  body2: {
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '16px',
    fontWeight: 500
  },

  button: {
    fontStyle: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    fontFamily: ["'Montserrat', sans-serif"].join(','),
    fontWeight: 700,
    boxShadow: 'none'
  },

  caption: {
    fontStyle: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: 700
  },

  overline: {
    fontStyle: 'normal',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400
  },

  customVariant: {
    fontStyle: 'normal',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400
  }
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d2c43',
      dark: '#24374d'
    },
    secondary: {
      main: '#e9c176',
      dark: '#c59843'
    },
    error: {
      main: '#FF4D4F',
      light: '#FF9495'
    },
    warning: {
      main: '#F9F136',
      light: '#FBF686'
    },
    success: {
      main: '#52C41A',
      light: '#97DB75'
    },
    info: {
      main: '#FFFFFF',
      light: '#B8B8B8'
    }
  },
  breakpoints: {
    values: {
      xs: 361,
      sm: 601,
      md: 769,
      lg: 900,
      xl: 1201
    }
  },
  typography
});

export default theme;
