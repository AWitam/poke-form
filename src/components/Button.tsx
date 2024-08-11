"use client";

import MUIButton, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const Button = styled(MUIButton)<ButtonProps>(
  ({ theme, variant}) => ({
    // base styles
    borderRadius: theme.shape.borderRadius,
    lineHeight: "1.25rem",
    padding: "0.625rem 1.25rem",
    boxShadow: "none",
    ":hover": {
      boxShadow: "none",
    },
    "&.Mui-focusVisible": {
      boxShadow: `0 0 0 4px ${theme.palette.action.focus}`,
    },

    // variant styles
    ...(variant === "soft" && {
      backgroundColor: theme.palette.grey[400],
      color: theme.palette.grey[100],
      ":hover": {
        backgroundColor: theme.palette.grey[300],
      },
    }),
  })
);
