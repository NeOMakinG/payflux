import { BlockProps } from "../components/Block/types";
import { BlockType } from "./functions";

export type BlockId = string;
export type BlocksStruct = { id: BlockId; children?: BlocksStruct[] };
export type BlockIdToProps = Record<BlockId, BlockProps>;
export type SelectedBlockModal = { id: BlockId; type: BlockType } | null;
