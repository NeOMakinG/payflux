import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";

export const WhitelistedAddresses = () => {
  const [text, setText] = useState<string>("");
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography variant="h6">Whitelisted Addresses :</Typography>
        <TextField
          label="Whitelisted Addresses"
          multiline
          rows={4}
          placeholder="Enter your newline-separated whitelisted addresses here."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
      <SubmitButton onClick={() => {}} />
    </Box>
  );
};
