import { BlockProps } from "../components/Block/types";
import { BlockType, Conditions, Functions } from "./functions";

export type BlockId = string;
export type BlocksStruct = { id: BlockId; children?: BlocksStruct[] };
export type BlockIdToProps = Record<BlockId, BlockProps>;
export type SelectedBlockModal = {
  id: BlockId;
  type: BlockType;
  mode: Functions | Conditions | null;
} | null;
