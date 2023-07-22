import { Box } from "@mui/material";
import { BlockType, Conditions, Functions } from "../../shared/functions";
import { enumToArray } from "../../utils/enumToArray";
import { usePayfluxStore } from "../../zustand";
import { FormModal } from "../FormModal";
import { FormModalProps } from "../FormModal/types";
import { useState } from "react";
import { BlockPresenter } from "./BlockPresenter";
import { blocksById } from "./constants";

const blockValuesByType = {
  [BlockType.CONDITION]: Conditions,
  [BlockType.FUNCTION]: Functions,
} as Record<BlockType, typeof Conditions | typeof Functions>;

export function AddBlockModal(props: FormModalProps) {
  const { selectedBlockModal, setBlockModal } = usePayfluxStore((state) => ({
    selectedBlockModal: state.selectedBlockModal,
    setBlockModal: state.setBlockModal,
  }));
  const [selectedBlock, setSelectedBlock] = useState<
    Conditions | Functions | null
  >(null);

  if (!selectedBlockModal) return null;

  const handleClose = () => {
    setBlockModal(null);
    setSelectedBlock(null);
  };

  return (
    <FormModal {...props} onClose={handleClose}>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        {!selectedBlock &&
          enumToArray<Conditions | Functions>(
            blockValuesByType[selectedBlockModal.type]
          ).map((block: Conditions | Functions) => (
            <BlockPresenter
              bodyText={block}
              onClick={() => setSelectedBlock(block)}
            />
          ))}
        {selectedBlock && blocksById[selectedBlock]}
      </Box>
    </FormModal>
  );
}
