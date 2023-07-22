import { Box, useTheme } from "@mui/material";
import { BlocksStruct } from "../../shared/structure";
import { BlockGenerator } from "./BlockGenerator";
import { PlusButton } from "../PlusButton";
import { Theme } from "@mui/material";

const map2: BlocksStruct = 
	{
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
                children: []
              },
              {
                id: "1.2.2",
                children: []
              }, 
              {
                id: "1.2.3",
                children: [
                  {
                    id: "1.2.3.4",
                    children: []
                  }
                ]
              }
          
            ],
          },
          {
            id: "1.2.3",
            children: []
          }
        ],
			},
      {
        id: "2.1",
        children: [
          {
            id: "2.1.1",
          }
        ]
      }
		],
	}
;

function renderBlocks(struct: BlocksStruct, theme: Theme) {
	if (!struct) {
		return <PlusButton />;
	}

	if (struct) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
          marginTop: "12px"
				}}
			>
				<BlockGenerator id={struct.id} />
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "flex-start",
						padding: "20px",
            position: "relative",
					}}
				>
          <Box sx={{
            display: "block",
            height: "2px",
            width: "100%",
            position: "absolute",
            top: "0",
            background: theme.palette.gradient.red,
            marginTop: "12px"
          }} />
          {!struct.children && <PlusButton />}
					{Array.isArray(struct.children) && struct.children.map((block) => {
						return renderBlocks(block, theme);
					})}
				</Box>
			</Box>
		);
	}
}

export const Playground = () => {
  const theme = useTheme();
	const structure = map2;
	return renderBlocks(structure, theme);
};
