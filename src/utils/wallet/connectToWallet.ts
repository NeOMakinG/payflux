import { getWalletProvider } from "./getWalletProvider";
import { DeterministicDeployer} from "@account-abstraction/sdk";

export const connectToWallet = async () => {
	const provider = await getWalletProvider();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	console.log(provider);
	// const deployer = new DeterministicDeployer(provider as any);
	// console.log(deployer);
	// deployer.deterministicDeploy({
	const accountFrom = await provider.request({ method: "eth_accounts" });

	return {
		accountFrom,
		provider,
	};
};

export const deployContract = async (bytecode: string) => {
	const { accountFrom, provider } = await connectToWallet();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const deployer = new DeterministicDeployer(provider as any);
	deployer.isContractDeployed = async () => false;
	await deployer.deterministicDeploy("0x" + bytecode);
	return;
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
