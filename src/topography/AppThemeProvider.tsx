import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import type { ReactNode } from 'react';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
  palette: {
    text: {
      primary: '#363636',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#363636',
        }
      }
    },
  }
});

export default function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
