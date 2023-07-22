import { BlockProps } from "../components/Block/types";

export type BlockId = string;
export type BlocksStruct = { id: BlockId; children?: BlocksStruct[] };
export type BlockIdToProps = Record<BlockId, BlockProps>;
