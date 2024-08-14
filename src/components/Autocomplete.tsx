"use client";

import type { ElementType } from "react";
import React from "react";
import type { ChipTypeMap } from "@mui/material";
import { alpha, Paper, styled } from "@mui/material";
import type { AutocompleteProps as MUIAutocompleteProps } from "@mui/material/Autocomplete";
import MUIAutocomplete from "@mui/material/Autocomplete";

const StyledAutocomplete = styled(MUIAutocomplete)(() => ({
  "& .MuiAutocomplete-inputRoot": {
    padding: "0.875rem 0.625rem",

    "& .MuiAutocomplete-input": {
      padding: 0,
    },
  },
})) as typeof MUIAutocomplete;

const StyledPaper = styled(Paper)(({ theme }) => ({
  "& .MuiAutocomplete-listbox": {
    color: theme.palette.common.black,

    "& .MuiAutocomplete-option": {
      padding: "0.25rem 0.75rem",
      lineHeight: "1.25rem",
      fontSize: "0.875rem",
    },
    "& .MuiAutocomplete-option[aria-selected='true']": {
      backgroundColor: "transparent",
      color: theme.palette.primary.main,

      "&.Mui-focused": {
        backgroundColor: theme.palette.action.focus,
      },
    },
  },
  "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
    backgroundColor: theme.palette.action.focus,
  },

  boxShadow: `0 4px 10px ${alpha(theme.palette.common.black, 0.1)}`,
}));

type DefaultChip = ChipTypeMap["defaultComponent"];

export const Autocomplete = <
  Value,
  Multiple extends boolean,
  DisableClearable extends boolean,
  FreeSolo extends boolean,
  ChipComponent extends ElementType = DefaultChip
>(
  props: MUIAutocompleteProps<
    Value extends string ? string : Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >
) => {
  return (
    <StyledAutocomplete
      fullWidth
      PaperComponent={(paperProps) => <StyledPaper {...paperProps} />}
      {...props}
    />
  );
};
