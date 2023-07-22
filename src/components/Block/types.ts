import { BlockType, Conditions, Functions } from "../../shared/functions"

export type BlockProps = {
    type: BlockType;
    func?: {
        name: Functions;
        context: any;
    };
    cond?: {
        name: Conditions;
        context: any;
    };
    topBar?: {
        text: string;
    };
    bottomBar?: {
        text: string;
    };
}
