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

type BlockModal = {
  id: string;
  type: BlockType;
};

export function AddBlockModal(props: FormModalProps) {
  const {
    selectedBlockModal,
    blockIdToProps,
    setBlockIdToProps,
    setBlockModal,
    addPlus,
  } = usePayfluxStore();

  if (!selectedBlockModal) return null;

  const handleClose = () => {
    setBlockModal(null);
  };

  const handleBlockClick = (
    blockModal: BlockModal,
    mode: Conditions | Functions
  ) => {
    const { id, type } = blockModal;
    if (!blocksByMode[mode]) {
      const firstId = Object.keys(blockIdToProps).length.toString();
      addPlus(id, firstId);
      if (type === BlockType.CONDITION) {
        const secondId = (Object.keys(blockIdToProps).length + 1).toString();
        addPlus(selectedBlockModal.id, secondId);
      }
      setBlockIdToProps(id, {
        type: selectedBlockModal.type,
        mode,
      });
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
              onClick={() => handleBlockClick(selectedBlockModal, block)}
            />
          ))}
        {selectedBlockModal.mode && blocksByMode[selectedBlockModal.mode]}
      </Box>
    </FormModal>
  );
}
