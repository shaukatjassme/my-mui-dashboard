// lib/theme.js
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Import Google Fonts
import '@fontsource/roboto';
import '@fontsource/montserrat';
import '@fontsource/lora';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'Lora',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontFamily: 'Lora',
    },
    h2: {
      fontFamily: 'Lora',
    },
    h3: {
      fontFamily: 'Montserrat',
    },
    h4: {
      fontFamily: 'Montserrat',
    },
    h5: {
      fontFamily: 'Montserrat',
    },
    h6: {
      fontFamily: 'Montserrat',
    },
    body1: {
      fontFamily: 'Roboto',
    },
    body2: {
      fontFamily: 'Roboto',
    },
    button: {
      fontFamily: 'Montserrat',
    },
  },
});

export default theme;
