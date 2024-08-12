"use client";

import React, { ElementType } from "react";
import {
  alpha,
  ChipTypeMap,
  Paper,
  styled,
  TextFieldProps,
} from "@mui/material";
import MUIAutocomplete, {
  AutocompleteProps as MUIAutocompleteProps,
} from "@mui/material/Autocomplete";
import { Input } from "./Input";

const StyledAutocomplete = styled(MUIAutocomplete)(({ theme }) => ({
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

interface AutocompleteProps<
  Value,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false,
  ChipComponent extends ElementType = DefaultChip
> extends Omit<
    MUIAutocompleteProps<
      Value,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent
    >,
    "renderInput"
  > {
  inputProps: TextFieldProps;
}

export const Autocomplete = <
  Value,
  Multiple extends boolean,
  DisableClearable extends boolean,
  FreeSolo extends boolean,
  ChipComponent extends ElementType = DefaultChip
>({
  inputProps,
  ...props
}: AutocompleteProps<
  Value extends string ? string : Value,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
>) => {
  return (
    <StyledAutocomplete
      fullWidth
      renderInput={(renderInputProps) => (
        <Input {...renderInputProps} {...inputProps} />
      )}
      PaperComponent={(paperProps) => <StyledPaper {...paperProps} />}
      {...props}
    />
  );
};
