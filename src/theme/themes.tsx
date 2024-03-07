import { createTheme } from '@mui/material';

export const nature = createTheme({
  palette: {
    primary: {
      main: '#388e3c', // Deep green
    },
    secondary: {
      main: '#1976d2', // Calming blue
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 16,
  },
  shape: {
    borderRadius: 8,
  },
});

export const tech = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Sleek blue
    },
    secondary: {
      main: '#ff4081', // Energetic pink
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 16,
  },
  shape: {
    borderRadius: 4,
  },
});

export const elegant = createTheme({
  palette: {
    primary: {
      main: '#673ab7', // Sophisticated purple
    },
    secondary: {
      main: '#ffeb3b', // Gold
    },
  },
  typography: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 16,
  },
  shape: {
    borderRadius: 12,
  },
});
