import { Button } from "@mui/material";
import { BlockType } from "../../../shared/functions";
import { usePayfluxStore } from "../../../zustand";

type SubmitButtonProps = {
  // eslint-disable-next-line
  context: any;
};

export const SubmitButton = ({ context }: SubmitButtonProps) => {
  const {
    selectedBlockModal,
    blockIdToProps,
    setBlockIdToProps,
    addChild,
    setBlockModal,
  } = usePayfluxStore();

  if (!selectedBlockModal) return null;

  const handleClick = () => {
    const newId = (Object.keys(blockIdToProps).length + 1).toString();
    setBlockIdToProps(newId, {
      type: selectedBlockModal.type,
      mode: selectedBlockModal.mode,
      context,
    });
    if (selectedBlockModal.type === BlockType.CONDITION) {
      addChild(selectedBlockModal.id, newId);
    }
    addChild(selectedBlockModal.id, newId);
    setBlockModal(null);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{
        marginTop: "10px",
        marginBottom: "10px",
      }}
      onClick={handleClick}
    >
      Submit
    </Button>
  );
};
