import { BlockType, Functions } from "../../shared/functions"
import { BlockId } from "../../shared/structure"
import { Block } from "../Block/block"
import { PlusButton } from "../PlusButton";

export const BlockGenerator = ({ id }: { id: BlockId }) => {
	console.log(id, typeof id);
	if (id === "start") return (
		<Block type={BlockType.START} />
	);
	if (typeof id === "string" && id.includes("end")) return (
		<Block type={BlockType.END} />
	);
	if (id === null) return (
		<PlusButton />
	)

	return (
		<Block type={BlockType.FUNCTION} content={{ name: `function-${id}` as Functions, context: undefined }} />
	)
}