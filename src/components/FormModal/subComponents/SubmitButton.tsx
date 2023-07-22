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
    addPlus,
    setBlockModal,
  } = usePayfluxStore();

  if (!selectedBlockModal) return null;

  const handleClick = () => {
    const { id, type, mode } = selectedBlockModal;

    const firstId = (Object.keys(blockIdToProps).length).toString();
      addPlus(id, firstId);
      if (type === BlockType.CONDITION) {
        const secondId = (Object.keys(blockIdToProps).length + 1).toString();
        addPlus(selectedBlockModal.id, secondId);
      }
      setBlockIdToProps(id, {
        type,
        mode,
        context,
      });
      setBlockModal(null);
      return;
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
