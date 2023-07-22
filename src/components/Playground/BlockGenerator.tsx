import { BlockType, Functions } from "../../shared/functions"
import { BlockId } from "../../shared/structure"
import { usePayfluxStore } from "../../zustand";
import { Block } from "../Block/block"

export const BlockGenerator = ({ id }: { id: BlockId }) => {
  const blockIdToProps = usePayfluxStore(state => state.blockIdToProps);
  const props = blockIdToProps[id];

	if (id === "start") return (
		<Block type={BlockType.START} />
	)
	return (
		<Block {...props} content={{ name: `${props.type}-${id}` as Functions, context: undefined }} />
	)
}