import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { SubmitButton } from "./SubmitButton";
import { usePayfluxStore } from "../../../zustand";

export const TimeInterval = () => {
  const { blockIdToProps, selectedBlockModal } = usePayfluxStore((state) => ({
    blockIdToProps: state.blockIdToProps,
    selectedBlockModal: state.selectedBlockModal,
  }));
  const props = selectedBlockModal?.id
    ? blockIdToProps[selectedBlockModal?.id]
    : null;

  const [selectedDateFirst, handleDateChangeFirst] = useState<Date | null>(
    props?.context?.selectedDateFirst ?? null
  );
  const [selectedDateSecond, handleDateChangeSecond] = useState<Date | null>(
    props?.context?.selectedDateSecond ?? null
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
          flexDirection: "rows",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Typography variant="h6" whiteSpace={"nowrap"}>Time Interval :</Typography>
        <TimePicker
          ampm={false}
          label="24 hours"
          value={selectedDateFirst}
          onChange={handleDateChangeFirst}
        />
        <Typography variant="h6">to</Typography>
        <TimePicker
          ampm={false}
          label="24 hours"
          value={selectedDateSecond}
          onChange={handleDateChangeSecond}
        />
      </Box>
      <SubmitButton context={{ selectedDateFirst, selectedDateSecond }} />
    </Box>
  );
};
