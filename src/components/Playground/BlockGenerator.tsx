import { BlockType } from "../../shared/functions";
import { BlockId } from "../../shared/structure";
import { usePayfluxStore } from "../../zustand";
import { useModal } from "../../zustand/modal";
import { Block } from "../Block/block";

export const BlockGenerator = ({ id }: { id: BlockId }) => {
  const blockIdToProps = usePayfluxStore((state) => state.blockIdToProps);
  const props = blockIdToProps[id];
  const openModal = useModal((state) => state.open);

  if (id === "start") return <Block type={BlockType.START} />;
  return (
    <Block
      {...props}
      onClickDelete={() => openModal("delete-block-form", { id })}
    />
  );
};
