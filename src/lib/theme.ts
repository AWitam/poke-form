"use client";

import { createTheme, PaletteOptions } from "@mui/material/styles";
import localFont from "next/font/local";

const IBM_VGA = localFont({
  src: "../../public/fonts/IBM_VGA.woff",
  display: "swap",
  preload: true,
});

export const theme = createTheme({
  typography: {
    fontFamily: IBM_VGA.style.fontFamily,
  },
  palette: {
    primary: {
      main: "rgba(151, 71, 255, 1)",
      dark: "rgba(113, 53, 191, 1)",
      light: "rgba(151, 71, 255, 0.25)",
    },
    grey: {
      "100": "rgba(42, 42, 42, 1)",
      "200": "rgba(127, 127, 127, 1)",
      "300": "rgba(228, 228, 228, 1)",
      "400": "rgba(238, 238, 238, 1) ",
    },
    error: {
      main: "rgba(255, 78, 78, 1) ",
    },
    background: {
      default: "rgba(255, 255, 255, 1)",
    },
    action: {
      focus: "rgba(151, 71, 255, 0.25)",
      disabledBackground: "rgba(0, 0, 0, 0.2)",
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        hiddenLabel: true,
      },
    },
  },
});
