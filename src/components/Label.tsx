"use client";

import { styled } from "@mui/material";
import type {
  InputLabelProps as MUIInputLabelProps,
} from "@mui/material/InputLabel";
import MUILabel from "@mui/material/InputLabel";

export const Label = styled(MUILabel)<MUIInputLabelProps>(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.grey[100],
  lineHeight: "1.25rem",
  fontWeight: 400,
}));
