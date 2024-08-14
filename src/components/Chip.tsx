"use client";

import { styled } from "@mui/material";
import type { ChipProps as MUIChipProps } from "@mui/material/Chip";
import MUIChip from "@mui/material/Chip";

export const Chip = styled(MUIChip)<MUIChipProps>(({ theme, variant }) => ({
  padding: "0.25rem 0.5rem",
  color: theme.palette.common.black,
  height: "unset",

  "& .MuiChip-label": {
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    fontWeight: 400,
    padding: "0",
  },
  ...(variant === "filled" && {
    backgroundColor: theme.palette.primary.light,
  }),
}));
