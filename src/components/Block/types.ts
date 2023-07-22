import { BlockType, Conditions, Functions } from "../../shared/functions";

export type BlockProps = {
  type: BlockType;
  mode?: Functions | Conditions | null;
  context?: any;
  topBar?: {
    text: string;
  };
  bottomBar?: {
    text: string;
  };
  dot?: "top" | "bottom" | "both";
  onClickDelete?: () => void;
};
