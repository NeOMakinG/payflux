import { Box } from "@mui/material";
import { BlocksStruct } from "../../shared/structure";
import { BlockGenerator } from "./BlockGenerator";
import { PlusButton } from "../PlusButton";


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
                children: []
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

function renderBlocks(struct: BlocksStruct) {
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
					}}
				>
          {!struct.children && <PlusButton />}
					{Array.isArray(struct.children) && struct.children.map((block) => {
						return renderBlocks(block);
					})}
				</Box>
			</Box>
		);
	}
}

export const Playground = () => {
	const structure = map2;
	return renderBlocks(structure);
};
