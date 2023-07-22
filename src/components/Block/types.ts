import { BlockType, Conditions, Functions } from "../../shared/functions"

export type BlockProps = {
	type: BlockType;
	content?: {
		name: Functions | Conditions;
		context: any;
	}
	topBar?: {
		text: string;
	};
	bottomBar?: {
		text: string;
	};
	dot?: "top" | "bottom" | "both";
}
