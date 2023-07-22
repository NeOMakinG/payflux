import { Box } from "@mui/material";
import { BlockType, Conditions, Functions } from "../../shared/functions";
import { enumToArray } from "../../utils/enumToArray";
import { usePayfluxStore } from "../../zustand";
import { FormModal } from "../FormModal";
import { FormModalProps } from "../FormModal/types";
import { useState } from "react";
import { BlockPresenter } from "./BlockPresenter";
import { blocksByMode } from "./constants";
import { BlockId } from "../../shared/structure";

const blockValuesByType = {
  [BlockType.CONDITION]: Conditions,
  [BlockType.FUNCTION]: Functions,
} as Record<BlockType, typeof Conditions | typeof Functions>;

type AddBlockModalProps = {
  blockId: BlockId;
} & FormModalProps;

export function AddBlockModal(props: AddBlockModalProps) {
  const {
    selectedBlockModal,
    blockIdToProps,
    setBlockIdToProps,
    addChild,
    setBlockModal,
    blockStructure,
  } = usePayfluxStore();
  console.log(blockStructure);
  const [selectedBlock, setSelectedBlock] = useState<
    Conditions | Functions | null
  >(null);

  if (!selectedBlockModal) return null;

  const addBlock = (type: BlockType, mode: Conditions | Functions) => {
    const newId = (Object.keys(blockIdToProps).length + 1).toString();
    console.log(props.blockId, newId, type, mode);
    return () => {
      setBlockIdToProps(newId, { type, mode });
      addChild(props.blockId, newId);
    };
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
