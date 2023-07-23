import { TrampolineProvider } from "../../types/TrampolineProvider";

export function getWalletProvider(timeout = 3000): Promise<TrampolineProvider> {
	let handled = false;

	return new Promise((resolve, reject) => {
		if ((window as Window)["aa-provider"]) {
			handleConnection();
		} else {
			window.addEventListener("ethereum#initialized", handleConnection, {
				once: true,
			});

			setTimeout(() => {
				handleConnection();
			}, timeout);
		}

		function handleConnection() {      
			if (handled) {
				resolve((window as Window)["aa-provider"] as TrampolineProvider);
				return;
			}
			handled = true;

			window.removeEventListener("ethereum#initialized", handleConnection);

			const ethereum = window["aa-provider"] as TrampolineProvider;

			if (ethereum) {
				resolve(ethereum as TrampolineProvider);
			} else {
				reject(new Error("Ethereum provider not found"));
			}
		}
	});
}
