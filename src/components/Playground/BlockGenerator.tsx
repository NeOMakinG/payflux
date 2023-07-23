import { Box } from "@mui/material";
import { BlockType } from "../../shared/functions";
import { BlockId } from "../../shared/structure";
import { usePayfluxStore } from "../../zustand";
import { useModal } from "../../zustand/modal";
import { Block } from "../Block/block";
import { PlusButton } from "../PlusButton";
import { blocksByMode } from "../AddBlockModal/constants";

export const BlockGenerator = ({ id }: { id: BlockId }) => {
  const { blockIdToProps, setBlockModal } = usePayfluxStore((state) => ({
    blockIdToProps: state.blockIdToProps,
    setBlockModal: state.setBlockModal,
  }));
  const props = blockIdToProps[id];
  const openModal = useModal((state) => state.open);

  const handleClick = () => {
    if (props.mode && blocksByMode[props.mode]) {
      setBlockModal({
        id,
        mode: props.mode ?? null,
        type: props.type,
      });
    }
  };

  if (id === "start") return <Block type={BlockType.START} />;
  if (props.type === BlockType.PLUS)
    return (
      <Box className="tf-nc">
        <PlusButton id={id} />
      </Box>
    );
  return (
    <Block
      {...props}
      onClickDelete={() => openModal("delete-block-form", { id })}
      onClick={handleClick}
    />
  );
};
