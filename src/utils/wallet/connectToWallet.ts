import { getWalletProvider } from "./getWalletProvider";

export const connectToWallet = async () => {
	const provider = await getWalletProvider();
	const accountFrom = await provider.request({ method: "eth_accounts" });

	return {
		accountFrom,
		provider,
	};
};

export const deployContract = async (bytecode: string) => {
	const { accountFrom, provider } = await connectToWallet();
	await provider.request({
		method: "eth_sendTransaction",
		params: [
			{
				from: accountFrom,
				data: bytecode,
			},
		],
	});
}
