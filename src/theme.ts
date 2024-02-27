// import { createTheme } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';

// Utils
import { pxToRem } from './utils/helper';

const theme: any = createTheme({
  palette: {
    primary: {
      main: "#EAA22B",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1D2129",
      contrastText: "#EAA22B",
    },
    divider: "#1d212933",
    tonalOffset: 0.1,
    text: {
      primary: "#1D2129",
    },
  },
  typography: {
    fontFamily: "open sans,helvetica neue,Helvetica,Arial,sans-serif",
    button: {
      lineHeight: 1.5,
    },
    // Display Medium
    h2: {
      fontSize: pxToRem(40),
      lineHeight: pxToRem(54),
      fontWeight: 700,
      '@media (max-width: 1440px)': {
        fontSize: pxToRem(26),
        lineHeight: pxToRem(34),
      },
      '@media (max-width: 900px)': {
        fontSize: pxToRem(24),
        lineHeight: pxToRem(32),
      },
    },
    h3: {
      fontSize: pxToRem(36),
      fontWeight: 700,
      '@media (max-width: 900px)': {
        fontSize: pxToRem(26),
      },
    },
    h4: {
      fontSize: pxToRem(32),
      fontWeight: 700,
    },
    // Title Medium
    body1: {
      fontSize: pxToRem(16),
      lineHeight: pxToRem(26),
      fontWeight: 500,
    },
    // Body Large
    body2: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(20),
    },
    // Headline Small
    subtitle1: {
      fontSize: pxToRem(18),
      lineHeight: pxToRem(28),
      fontWeight: 700,
      '@media (max-width: 900px)': {
        fontSize: pxToRem(16),
        lineHeight: pxToRem(28),
      },
    },
    // Headline Medium
    subtitle2: {
      fontSize: pxToRem(22),
      lineHeight: pxToRem(30),
      fontWeight: 500,
      '@media (max-width: 900px)': {
        fontSize: pxToRem(18),
        lineHeight: pxToRem(24),
      },
    },
    // Title Small
    overline: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(20),
      fontWeight: 600,
      textTransform: "initial",
    },
    // Body Medium
    caption: {
      fontSize: pxToRem(13),
      lineHeight: pxToRem(18),
      fontWeight: 600,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1580,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          width: '100%',
          height: '100%',
        },
        body: {
          width: '100%',
          height: '100%',
        },
        img: {
          verticalAlign: 'middle',
          userSelect: 'none',
          maxWidth: "100%",
          height: "auto",
        },
        svg: {
          verticalAlign: 'middle',
        },
        video: {
          verticalAlign: 'middle',
        },
        '#root': {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "#1D2129B3",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
        fixed: true,
      },
      styleOverrides: {
        root: {
          paddingLeft: 20,
          paddingRight: 20,
          '@media (max-width: 900px)': {
            maxWidth: "initial",
          },
          '@media (min-width: 900px) and (max-width: 1100px)': {
            maxWidth: 1000,
          },
          '@media (min-width: 1800px)': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
    MuiStack: {
      defaultProps: {
        flexDirection: "row",
        useFlexGap: true,
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
        hiddenLabel: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        input: {
          paddingTop: 10,
          paddingBottom: 10,
        },
      },
    },
    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #E5E6EB",
          marginTop: "8px !important",
        },
        input: {
          '&:-webkit-autofill': {
            borderRadius: 'inherit',
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          color: "#1D2129",
          fontSize: pxToRem(14),
          lineHeight: pxToRem(20),
          fontWeight: 600,
          position: "static",
          transform: "none",
        },
        asterisk: {
          color: "#FF1F1F",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "initial",
          minWidth: "initial",
        },
        text: {
          padding: 0,
        },
        textPrimary: {
          "&:hover": {
            color: "#1D2129",
            backgroundColor: "transparent",
          },
        },
        textSecondary: {
          fontSize: pxToRem(14),
          lineHeight: pxToRem(20),
          fontWeight: 600,
          textDecoration: "underline",
          "&:hover": {
            color: "#EAA22B",
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        },
        containedSizeMedium: {
          fontSize: "1rem",
          padding: "9px 18px",
        },
        containedSizeLarge: {
          fontSize: pxToRem(16),
          lineHeight: pxToRem(20),
          fontWeight: 600,
        },
        outlinedSizeLarge: {
          fontSize: pxToRem(16),
          lineHeight: pxToRem(20),
          fontWeight: 600,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          height: 40,
          width: 40,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          cursor: "pointer",
          color: "#1D2129",
          "&:hover": {
            color: "#EAA22B",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          opacity: 1,
        },
        vertical: {
          height: 18,
          alignSelf: "initial",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCardActions: {
      defaultProps: {
        disableSpacing: true,
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 0,
        disablePortal: true,
      },
      styleOverrides: {
        paper: {
          boxShadow: "0px -2px 17.4px rgba(0, 0, 0, 0.05), 0px 5px 35.4px rgba(0, 0, 0, 0.07);",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          border: "1px solid #E5E6EB",
          borderRadius: 30,
        },
        grouped: {
          margin: 0,
          border: "none",
          fontStyle: "italic",
          minWidth: 153,
          paddingTop: 15,
          paddingBottom: 15,
          borderRadius: "inherit",
          "&.Mui-selected": {
            fontWeight: 700,
            fontStyle: "normal",
            color: "#FFFFFF",
            backgroundColor: "#EAA22B",
            letterSpacing: 1,
            "&:hover": {
              color: "#EAA22B",
            },
            '@media (max-width: 600px)': {
              minWidth: 120,
            },
          },
          '@media (max-width: 600px)': {
            minWidth: 100,
          },
        },
        firstButton: {
          paddingRight: 0,
        },
        lastButton: {
          paddingLeft: 0,
        },
      },
    },
    MuiList: {
      defaultProps: {
        disablePadding: true,
      },
    },
    MuiListItem: {
      defaultProps: {
        disablePadding: true,
        disableGutters: true,
      },
    },
    MuiListItemText: {
      defaultProps: {
        primaryTypographyProps: {
          noWrap: true,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "default",
        elevation: 0,
        square: true,
      },
      styleOverrides: {
        colorDefault: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "#FFFFFF",
          fontSize: pxToRem(20),
        },
        tooltip: {
          padding: 0,
          color: "#1D2129",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 20px 30px 0px #0000000F",
        },
        popper: {
          "&[data-popper-placement*='bottom']": {
            ".MuiTooltip-tooltip": {
              "&.MuiTooltip-tooltipPlacementBottom": {
                marginTop: 14,
              },
            },
          },
        },
        tooltipPlacementTop: {
          ".MuiTooltip-arrow": {
            "&:before": {
              borderBottomRightRadius: 4,
            },
          },
        },
        tooltipPlacementBottom: {
          ".MuiTooltip-arrow": {
            "&:before": {
              borderTopLeftRadius: 4,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        container: {
          boxShadow: "none",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiDialogActions: {
      defaultProps: {
        disableSpacing: true,
      },
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1099,
  },
});

export default theme;