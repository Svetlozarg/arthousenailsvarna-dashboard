/* eslint-disable no-unused-vars */
"use client";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    customColors: {
      gold?: string;
      darkRed?: string;
    };
  }

  interface Palette {
    customColors: {
      gold?: string;
      darkRed?: string;
    };
  }
}

const staticThemeColors = {
  grey: {
    50: "#F5F5F5",
    100: "#EAEAEA",
    200: "#D5D5D5",
    300: "#CACACA",
    400: "#C0C0C0",
    500: "#B5B5B5",
    600: "#A0A0A0",
    700: "#8A8A8A",
    800: "#808080",
    900: "#555555",
  },
};

const themeOptions: ThemeOptions = {
  palette: {
    common: {
      white: "#FFFFFF",
      black: "#000000",
    },
    text: {
      primary: "#000000",
    },
    background: {
      default: "#f7f5f5",
    },
    primary: {
      main: "#d1b160",
      dark: "#f2f3f5",
    },
    secondary: {
      main: "#f7e1e3",
    },
    error: {
      main: "#AD2323",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#F9BB00",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#008A3A",
      contrastText: "#FFFFFF",
    },
    customColors: {
      gold: "#FFD700",
      darkRed: "#DF4C5B",
    },
    grey: staticThemeColors.grey,
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.1rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "0.95rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: "inherit",
          textDecoration: "none",
          cursor: "pointer",
        },
      },
    },
  },
};

const theme = responsiveFontSizes(createTheme(themeOptions), { factor: 2.3 });

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
