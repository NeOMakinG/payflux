import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { usePayfluxStore } from "../../../zustand";

export const RateTreshold = () => {
  const { blockIdToProps, selectedBlockModal } = usePayfluxStore((state) => ({
    blockIdToProps: state.blockIdToProps,
    selectedBlockModal: state.selectedBlockModal,
  }));
  const props = selectedBlockModal?.id
    ? blockIdToProps[selectedBlockModal?.id]
    : null;

  const [number, setNumber] = useState<number | null>(
    props?.context?.number ?? null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums === "") {
      setNumber(null);
    } else {
      setNumber(parseInt(onlyNums));
    }
  };

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
        <Typography variant="h6" whiteSpace={"nowrap"}>Rate Treshold :</Typography>
        <TextField
          label="Rate Treshold"
          placeholder="Txs per day per address"
          value={number ?? ""}
          onChange={handleChange}
          sx={{
            width: "50%",
          }}
        />
      </Box>
      <SubmitButton context={{ number }} />
    </Box>
  );
};
