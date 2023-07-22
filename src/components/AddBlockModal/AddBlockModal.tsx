import { Box } from "@mui/material";
import { BlockType, Conditions, Functions } from "../../shared/functions";
import { enumToArray } from "../../utils/enumToArray";
import { usePayfluxStore } from "../../zustand";
import { FormModal } from "../FormModal";
import { FormModalProps } from "../FormModal/types";
import { useState } from "react";
import { BlockPresenter } from "./BlockPresenter";

const blockValuesByType = {
  [BlockType.CONDITION]: Conditions,
  [BlockType.FUNCTION]: Functions,
} as Record<BlockType, typeof Conditions | typeof Functions>;

export function AddBlockModal(props: FormModalProps) {
  const { selectedBlockModal } = usePayfluxStore((state) => ({
    selectedBlockModal: state.selectedBlockModal,
  }));
  const [showForm, setShowForm] = useState(false);

  const handleBlockClick = (block: Conditions | Functions) => {
    console.log(block);
    if (selectedBlockModal?.type === BlockType.FUNCTION) {
      setShowForm(true);
      return;
    }

    if (selectedBlockModal?.type === BlockType.CONDITION) {
      setShowForm(true);
      return;
    }
  };

  if (!selectedBlockModal) return null;

  return (
    <FormModal {...props}>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        {!showForm &&
          enumToArray<Conditions | Functions>(
            blockValuesByType[selectedBlockModal.type]
          ).map((block: Conditions | Functions) => (
            <BlockPresenter
              bodyText={block}
              onClick={() => handleBlockClick(block)}
            />
          ))}
        {showForm && <>Form</>}
      </Box>
    </FormModal>
  );
}
