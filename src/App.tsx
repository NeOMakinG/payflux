
import { Box } from "@mui/material";
import { Block } from "./components/Block/block";
import { BlockType, Conditions, Functions } from "./shared/functions";

function App() {
	return (
		<Box sx={{display: "flex", gap: "10px", alignItems: "center"}}>
			<Block type={BlockType.FUNCTION} content={{ name: Functions.ADD, context: undefined }} topBar={{ text: "Case: 1" }} dot={"both"}/>
			<Block type={BlockType.CONDITION} content={{ name: Conditions.SWITCH, context: undefined }} bottomBar={{ text: "Switch: var" }} />
			<Block type={BlockType.FUNCTION} dot={"both"}/>
		</Box>
	);
}

export default App;
