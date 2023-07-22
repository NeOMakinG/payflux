import { TrampolineProvider } from "./TrampolineProvider";

declare global {
	interface Window {
		"aa-provider": TrampolineProvider;
	}
}

