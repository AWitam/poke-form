"use client";

import { styled } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export const Input = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiInputBase-root": {
    margin: "0.125rem 0",
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputBase-input": {
    color: theme.palette.grey[100],
    padding: " 0.875rem 0.625rem",
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
    color: theme.palette.grey[100],
  },
}));
