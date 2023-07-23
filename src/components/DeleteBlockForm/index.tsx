import { Box, Button, Typography } from "@mui/material";
import { useModal } from "../../zustand/modal";
import { usePayfluxStore } from "../../zustand";

export function DeleteBlockForm() {
	const closeModal = useModal((state) => state.close);
	const removeBlock = usePayfluxStore(state => state.removeBlock)
	const modalProps = useModal((state) => state.status["delete-block-form"]?.props);

	const deleteBlock = () => {
		removeBlock(modalProps?.id as string);
		closeModal("delete-block-form");
	};

	const cancel = () => {
		closeModal("delete-block-form");
	};
  return (
		<Box display={"flex"} flexDirection={"column"} gap={"20px"}>
			<Typography>If you remove this block, all the children will be removed too.</Typography>
			<Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"20px"}>
				<Button color="error" onClick={deleteBlock}>I want to remove it!</Button>
				<Button color="primary" onClick={cancel}>No thanks</Button>
			</Box>
		</Box>
	);
}