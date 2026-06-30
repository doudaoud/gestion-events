import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#18181b',
          light: '#3f3f46',
          dark: '#09090b',
          contrastText: '#fafafa',
        },
        secondary: {
          main: '#71717a',
          light: '#a1a1aa',
          dark: '#52525b',
          contrastText: '#fafafa',
        },
        error: {
          main: '#ef4444',
          light: '#f87171',
          dark: '#dc2626',
        },
        warning: {
          main: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
        },
        info: {
          main: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
        },
        success: {
          main: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        background: {
          default: '#fafafa',
          paper: '#ffffff',
        },
        text: {
          primary: '#09090b',
          secondary: '#71717a',
        },
        divider: '#e4e4e7',
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#fafafa',
          light: '#ffffff',
          dark: '#e4e4e7',
          contrastText: '#09090b',
        },
        secondary: {
          main: '#a1a1aa',
          light: '#d4d4d8',
          dark: '#71717a',
          contrastText: '#09090b',
        },
        error: {
          main: '#ef4444',
          light: '#f87171',
          dark: '#dc2626',
        },
        warning: {
          main: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
        },
        info: {
          main: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
        },
        success: {
          main: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        background: {
          default: '#09090b',
          paper: '#18181b',
        },
        text: {
          primary: '#fafafa',
          secondary: '#a1a1aa',
        },
        divider: '#27272a',
      },
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 2px 4px 0 rgb(0 0 0 / 0.06)',
    '0 4px 8px 0 rgb(0 0 0 / 0.08)',
    '0 6px 12px 0 rgb(0 0 0 / 0.1)',
    '0 8px 16px 0 rgb(0 0 0 / 0.12)',
    '0 12px 24px 0 rgb(0 0 0 / 0.14)',
    '0 16px 32px 0 rgb(0 0 0 / 0.16)',
    '0 20px 40px 0 rgb(0 0 0 / 0.18)',
    '0 24px 48px 0 rgb(0 0 0 / 0.2)',
    '0 28px 56px 0 rgb(0 0 0 / 0.22)',
    '0 32px 64px 0 rgb(0 0 0 / 0.24)',
    '0 36px 72px 0 rgb(0 0 0 / 0.26)',
    '0 40px 80px 0 rgb(0 0 0 / 0.28)',
    '0 44px 88px 0 rgb(0 0 0 / 0.3)',
    '0 48px 96px 0 rgb(0 0 0 / 0.32)',
    '0 52px 104px 0 rgb(0 0 0 / 0.34)',
    '0 56px 112px 0 rgb(0 0 0 / 0.36)',
    '0 60px 120px 0 rgb(0 0 0 / 0.38)',
    '0 64px 128px 0 rgb(0 0 0 / 0.4)',
  ],
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '0.35rem 1rem',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            opacity: '0.8',
          },
        },
        sizeSmall: {
          padding: '0.2rem 0.8rem',
          fontSize: '0.8125rem',
        },
        sizeLarge: {
          padding: '0.5rem 1.5rem',
          fontSize: '0.9375rem',
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiRadio: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiSwitch: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiChip: {
      defaultProps: {
        deleteIcon: undefined,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '& input': {
              padding: '0.5rem 0.75rem',
            },
          },
          '& .MuiInputLabel-root': {
            transform: 'translate(0.75rem, 0.5rem) scale(1)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(0.875rem, -0.5625rem) scale(0.75)',
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 0.5,
          },
        },
      },
    },
  },
})

export default theme;
