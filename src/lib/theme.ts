'use client';

import { createTheme } from "@mui/material/styles";
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
});
