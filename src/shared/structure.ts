import { BlockProps } from "../components/Block/types";

export type BlockId =
	| "start" // for start block
	| number // for the many ends
	| string; // for normal blocks
export type BlocksStruct = { id: string; children?: BlocksStruct[] };
export type BlockIdToProps = Map<BlockId, BlockProps>;
