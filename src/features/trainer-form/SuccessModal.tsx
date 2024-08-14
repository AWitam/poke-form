"use client";

import { Button, Paper, Typography } from "@mui/material";

import Modal from "@mui/material/Modal";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}
export const SuccessModal = ({
  isOpen,
  onClose,
  onReset,
}: SuccessModalProps) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 4,
          }}
        >
          <Typography variant="h2" color="primary.main" id="modal-modal-title">
            Success
          </Typography>
          <Button variant="contained" color="primary" onClick={onReset}>
            Reset form
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};
