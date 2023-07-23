import { Box, Button, TextField, Typography } from "@mui/material";
import { useMetadata } from "../../zustand/metadata";
import { useModal } from "../../zustand/modal";

export function ContractMetadataForm() {
	const { contractName, setContractName } = useMetadata();
	const closeModal = useModal((state) => state.close);

	const onConfirm = () => {
		if (!contractName) return;
		closeModal("contract-metadata-form");
	};

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			gap={"25px"}
      padding={"15px 25px"}
		>
			<Typography>Please add a contract name</Typography>
			<TextField
				value={contractName}
				onChange={(e) => setContractName(e.target.value)}
			/>
			<Button variant="contained" onClick={onConfirm}>
				Confirm
			</Button>
		</Box>
	);
}
