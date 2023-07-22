import { Box } from "@mui/material";
import { BlockType, Conditions, Functions } from "../../shared/functions";
import { enumToArray } from "../../utils/enumToArray";
import { usePayfluxStore } from "../../zustand";
import { FormModal } from "../FormModal";
import { FormModalProps } from "../FormModal/types";
import { useState } from "react";
import { BlockPresenter } from "./BlockPresenter";
import { blocksByMode } from "./constants";

const blockValuesByType = {
  [BlockType.CONDITION]: Conditions,
  [BlockType.FUNCTION]: Functions,
} as Record<BlockType, typeof Conditions | typeof Functions>;

export function AddBlockModal(props: FormModalProps) {
  const {
    selectedBlockModal,
    blockIdToProps,
    setBlockIdToProps,
    addChild,
    setBlockModal,
  } = usePayfluxStore();
  const [selectedBlock, setSelectedBlock] = useState<
    Conditions | Functions | null
  >(null);

  if (!selectedBlockModal) return null;

  const addBlock = (type: BlockType, mode: Conditions | Functions) => {
    const newId = (Object.keys(blockIdToProps).length + 1).toString();
    setBlockIdToProps(newId, { type, mode });
    if (type === BlockType.CONDITION) {
      addChild(selectedBlockModal.id, newId);
    }
    addChild(selectedBlockModal.id, newId);
  };

  const handleClose = () => {
    setBlockModal(null);
    setSelectedBlock(null);
  };

  const handleBlockClick = (type: BlockType, mode: Conditions | Functions) => {
    if (!blocksByMode[mode]) {
      addBlock(type, mode);
      setBlockModal(null);
      return;
    }

    setSelectedBlock(mode);
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
              onClick={() => handleBlockClick(selectedBlockModal.type, block)}
            />
          ))}
        {selectedBlock && blocksByMode[selectedBlock]}
      </Box>
    </FormModal>
  );
}
