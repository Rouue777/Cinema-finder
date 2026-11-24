import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { HashRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const theme = createTheme({
  palette: {
    primary: {
      main: '#7F1D32',
      dark: '#5C1525',
      light: '#A34356',
      contrastText: '#F5F0E6',
    },
    secondary: {
      main: '#C69B45',
      dark: '#98732F',
      light: '#DDBD7D',
      contrastText: '#292524',
    },
    background: {
      default: '#F5F0E6',
      paper: '#FFFCF6',
    },
    text: {
      primary: '#292524',
      secondary: '#6B625B',
    },
    divider: '#E6DCCB',
    grey: {
      main: '#E6DCCB',
    },
  },

  typography: {
    fontFamily: '"Roboto", sans-serif',

    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 10,
  },

  shadows: [
    'none',
    '0px 1px 3px rgba(41, 37, 36, 0.08)',
    '0px 2px 6px rgba(41, 37, 36, 0.08)',
    '0px 4px 10px rgba(41, 37, 36, 0.10)',
    '0px 6px 14px rgba(41, 37, 36, 0.10)',
    ...Array(20).fill('0px 8px 20px rgba(41, 37, 36, 0.10)'),
  ],

  components: {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        borderRadius: 10,
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        border: '1px solid #E6DCCB',
        borderRadius: 12,
        boxShadow: '0px 2px 6px rgba(41, 37, 36, 0.08)',
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '8px 16px',
        textTransform: 'none',
        fontWeight: 500,
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: '#E6DCCB',
      },
    },
  },
},
});


const Provider = ({ children }) => (
  <HashRouter>
    <ThemeProvider {...{ theme }}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', timeout: 500 }}>
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  </HashRouter>
);
export default Provider;