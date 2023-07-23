import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { usePayfluxStore } from "../../../zustand";

type AmountsAndTokens = {
  amount: number | null;
  token: string | null;
}[];

export const Tokens = () => {
  const { blockIdToProps, selectedBlockModal } = usePayfluxStore((state) => ({
    blockIdToProps: state.blockIdToProps,
    selectedBlockModal: state.selectedBlockModal,
  }));
  const props = selectedBlockModal?.id
    ? blockIdToProps[selectedBlockModal?.id]
    : null;

  const [amountsAndTokens, setAmountsAndTokens] = useState<AmountsAndTokens>(
    props?.context?.amountsAndTokens ?? []
  );

  const handleChangeAmount = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyNums = e.target.value.replace(/[^0-9]/g, "");
      const newAmountsAndTokens = [...amountsAndTokens];
      if (onlyNums === "") {
        newAmountsAndTokens[index].amount = null;
      } else {
        newAmountsAndTokens[index].amount = parseInt(onlyNums);
      }
      setAmountsAndTokens(newAmountsAndTokens);
    },
    [amountsAndTokens]
  );

  const handleChangeToken = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAmountsAndTokens = [...amountsAndTokens];
      if (e.target.value === "") {
        newAmountsAndTokens[index].token = null;
      } else {
        newAmountsAndTokens[index].token = e.target.value;
      }
      setAmountsAndTokens(newAmountsAndTokens);
    },
    [amountsAndTokens]
  );

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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Typography variant="h6">Minimum Amount by Token :</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {amountsAndTokens.map((amountAndToken, index) => (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <TextField
                label="Token"
                rows={2}
                placeholder="Token symbol"
                value={amountAndToken.token ?? ""}
                onChange={handleChangeToken(index)}
              />
              <TextField
                label="Minimum Amount"
                rows={2}
                placeholder="Token symbol"
                value={amountAndToken.amount ?? ""}
                onChange={handleChangeAmount(index)}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <IconButton
          onClick={() =>
            setAmountsAndTokens([
              ...amountsAndTokens,
              { amount: null, token: null },
            ])
          }
        >
          <AddCircleIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            setAmountsAndTokens([...amountsAndTokens.slice(0, -1)])
          }
        >
          <RemoveCircleIcon />
        </IconButton>
      </Box>
      <SubmitButton context={{ amountsAndTokens }} />
    </Box>
  );
};
