import { Modal, Fade, Box } from "@mui/material";
import { FormModalProps } from "./types";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "15px",
  ":focus": {
    outline: "none",
  },
  minWidth: "700px",
};

export function FormModal({ onClose, open, children }: FormModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disablePortal
      sx={{
        minWidth: "700px",
      }}
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
}
