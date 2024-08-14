"use client";

import { styled } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";

export const Input = styled(TextField)<TextFieldProps>(({ theme, error }) => ({
  "& .MuiInputBase-root": {
    margin: "0.125rem 0",
    "& fieldset": {
      borderColor: theme.palette.grey[400],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },

  "& .MuiInputBase-root.Mui-error": {
    "& fieldset": {
      borderColor: theme.palette.grey[400],
    },
  },

  "& .MuiInputBase-input": {
    color: theme.palette.grey[100],
    padding: "0.875rem 0.625rem",
    lineHeight: "1.25rem",
    fontSize: "0.875rem",
    fontWeight: 400,
    height: "auto",

    "&::placeholder": {
      color: theme.palette.grey[200],
    },
  },
  "& .Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      boxShadow: `0 0 0 4px ${theme.palette.action.focus}`,
    },
  },

  "& .MuiFormHelperText-root": {
    margin: "0",
    color: error ? theme.palette.error.main : theme.palette.grey[100],
  },

  "& input[type=number]": {
    appearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    appearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    appearance: "none",
    margin: 0,
  },
}));
