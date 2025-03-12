import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Popup from './Popup';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    background: {
      default: '#ffffff',
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Popup />
  </ThemeProvider>
);
