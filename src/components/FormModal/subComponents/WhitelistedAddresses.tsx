import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";

export const WhitelistedAddresses = () => {
  const [text, setText] = useState<string | null>(null);
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
        <Typography variant="h6">Whitelisted Addresses :</Typography>
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
