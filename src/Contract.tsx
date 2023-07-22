import "./App.css";
import { Typography } from "@mui/material";
import { useContract, useCompileContract, PaymasterContractType } from "./hooks/useContract";
import { useEffect } from "react";

function Contract() {

	const contract = useContract(PaymasterContractType.DepositPaymaster);

	const { compiledContract, compile, compiling } = useCompileContract(contract);

	useEffect(() => {
		if (!compiling && compiledContract) {
			console.log(compiledContract);
		}
	}, [compiling, compiledContract]);

	return (
		<>
			<button onClick={compile}>Compile</button>
			<Typography>{contract}</Typography>
		</>
	);
}

export default Contract;
