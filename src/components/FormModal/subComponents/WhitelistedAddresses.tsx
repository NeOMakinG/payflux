import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { usePayfluxStore } from "../../../zustand";

export const WhitelistedAddresses = () => {
  const { blockIdToProps, selectedBlockModal } = usePayfluxStore((state) => ({
    blockIdToProps: state.blockIdToProps,
    selectedBlockModal: state.selectedBlockModal,
  }));
  const props = selectedBlockModal?.id
    ? blockIdToProps[selectedBlockModal?.id]
    : null;

  const [text, setText] = useState<string | null>(props?.context?.text ?? null);
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "rows",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Typography variant="h6" whiteSpace={"nowrap"}>Whitelisted Addresses :</Typography>
        <TextField
          label="Whitelisted Addresses"
          multiline
          rows={4}
          placeholder="Enter your newline-separated whitelisted addresses here."
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{
            width: "50%",
          }}
        />
      </Box>
      <SubmitButton context={{ text }} />
    </Box>
  );
};
