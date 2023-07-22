import { Box, useTheme } from "@mui/material";
import { BlocksStruct } from "../../shared/structure";
import { BlockGenerator } from "./BlockGenerator";
import { PlusButton } from "../PlusButton";
import { Theme } from "@mui/material";
import "treeflex/dist/css/treeflex.css";
import "./custom-treeflex.css";

const map2: BlocksStruct = {
	id: "start",
	children: [
		{
			id: "1",
			children: [
				{
					id: "1.2",
					children: [
						{
							id: "1.2.1",
							children: [],
						},
						{
							id: "1.2.2",
							children: [],
						},
						{
							id: "1.2.3",
							children: [
								{
									id: "1.2.3.4",
									children: [],
								},
							],
						},
					],
				},
				{
					id: "1.2.3",
					children: [],
				},
			],
		},
		{
			id: "2.1",
			children: [
				{
					id: "2.1.1",
				},
			],
		},
	],
};
function renderBlocks(struct: BlocksStruct, theme: Theme) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
			component={"li"}
		>
			<BlockGenerator id={struct.id} />
			{((Array.isArray(struct.children) && struct.children.length > 0) ||
				!struct.children) && (
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "flex-start",
						position: "relative",
					}}
					component={"ul"}
				>
					{!struct.children && (
						<Box
							component={"li"}
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Box className="tf-nc">
								<PlusButton />
							</Box>
			
						</Box>
					)}
					{Array.isArray(struct.children) &&
						struct.children.map((block) => {
							return renderBlocks(block, theme);
						})}
				</Box>
			)}
		</Box>
	);
}

export const Playground = () => {
	const theme = useTheme();
	const structure = map2;

	return (
		<Box className="tf-tree tf-gap-lg">
			{structure && (
				<Box component={"ul"}>{renderBlocks(structure, theme)}</Box>
			)}
		</Box>
	);
};
