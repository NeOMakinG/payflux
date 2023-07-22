import { Box } from "@mui/material";
import { BlockType, Conditions, Functions } from "../../shared/functions";
import { enumToArray } from "../../utils/enumToArray";
import { usePayfluxStore } from "../../zustand";
import { FormModal } from "../FormModal";
import { FormModalProps } from "../FormModal/types";
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
  };

  const handleBlockClick = (type: BlockType, mode: Conditions | Functions) => {
    if (!blocksByMode[mode]) {
      addBlock(type, mode);
      setBlockModal(null);
      return;
    }

    setBlockModal({ ...selectedBlockModal, mode });
  };

  return (
    <FormModal {...props} onClose={handleClose}>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        {!selectedBlockModal.mode &&
          enumToArray<Conditions | Functions>(
            blockValuesByType[selectedBlockModal.type]
          ).map((block: Conditions | Functions) => (
            <BlockPresenter
              bodyText={block}
              onClick={() => handleBlockClick(selectedBlockModal.type, block)}
            />
          ))}
        {selectedBlockModal.mode && blocksByMode[selectedBlockModal.mode]}
      </Box>
    </FormModal>
  );
}
