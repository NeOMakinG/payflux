import { getWalletProvider } from "./getWalletProvider";

export const connectToWallet = async () => {
	const provider = await getWalletProvider();
	return provider.request({ method: "eth_accounts" });
};
