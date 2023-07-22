import { Box, useTheme } from "@mui/material";
import { BlocksStruct } from "../../shared/structure";
import { BlockGenerator } from "./BlockGenerator";
import { PlusButton } from "../PlusButton";
import { Theme } from "@mui/material";
import "treeflex/dist/css/treeflex.css";
import "./custom-treeflex.css";
import { AddBlockModal } from "../AddBlockModal/AddBlockModal";
import { usePayfluxStore } from "../../zustand";

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
      key={struct.id}
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
                <PlusButton id={struct.id} />
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

type PlaygroundProps = {
  blockStructure: BlocksStruct;
};

export const Playground = ({ blockStructure }: PlaygroundProps) => {
  const theme = useTheme();
  const { setBlockModal, selectedBlockModal } = usePayfluxStore((state) => ({
    setBlockModal: state.setBlockModal,
    selectedBlockModal: state.selectedBlockModal,
  }));

  return (
    <Box className="tf-tree tf-gap-lg">
      {blockStructure && (
        <Box component={"ul"}>{renderBlocks(blockStructure, theme)}</Box>
      )}
      <AddBlockModal
        onClose={() => setBlockModal(null)}
        open={!!selectedBlockModal}
      >
        <></>
      </AddBlockModal>
    </Box>
  );
};
