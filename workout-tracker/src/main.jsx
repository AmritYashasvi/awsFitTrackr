import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
// import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f50057',
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

