import { SideBar } from "./components/SideBar";
import { Box, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { Playground } from "./components/Playground";
import { usePayfluxStore } from "./zustand";
import { FormModal } from "./components/FormModal";
import { DeleteBlockForm } from "./components/DeleteBlockForm";
import { useModal } from "./zustand/modal";
import { CodeManager } from "./components/CodeManager";
import "./app.css";
import { ContractMetadataForm } from "./components/ContractMetadataForm";

function App() {
  const theme = useTheme();
  const blockStructure = usePayfluxStore((state) => state.blockStructure);
  const editorPanel = useRef<ImperativePanelHandle>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const modalStatus = useModal((state) => state.status);
  const closeModal = useModal((state) => state.close);
  const openModal = useModal((state) => state.open);
  const handleCollapseClick = () => {
    if (editorPanel.current?.getSize() === 1) {
      editorPanel.current?.expand();
      editorPanel.current?.resize(50);
      return;
    }

    editorPanel.current?.collapse();
  };

  useEffect(() => {
    openModal("contract-metadata-form", {});
    // eslint-disable-next-line
  }, []);

  const worker = new Worker("../dist/bundle.js");
  worker.addEventListener(
    "message",
    function (e) {
      const output = e.data.output;
      for (const contractName in output.contracts["contract"]) {
        console.log(
          `Bytecode of contract ${contractName}: ${output.contracts["contract"][contractName].evm.bytecode.object}`
        );
      }
    },
    false
  );

  return (
    <>
      {/* DELETE BLOCK FORM */}
      <FormModal
        open={modalStatus["delete-block-form"]?.status || false}
        onClose={() => {
          closeModal("delete-block-form");
        }}
      >
        <DeleteBlockForm />
      </FormModal>
      <FormModal
        open={modalStatus["contract-metadata-form"]?.status || false}
        onClose={() => null}
      >
        <ContractMetadataForm />
      </FormModal>
      <Box height="100vh" marginTop={0} display="flex" alignItems="center">
        <SideBar />
        <PanelGroup direction="horizontal">
          <Box display="flex" alignItems="center" width="100%">
            <Panel id="tree" defaultSize={50} order={1}>
              <Box
                height="90vh"
                overflow={"auto"}
                paddingTop={"20px"}
                position={"relative"}
                display={"flex"}
                justifyContent={"center"}
                className={"noBar"}
              >
                <Box position={"absolute"}>
                  <Playground blockStructure={blockStructure} />
                </Box>
              </Box>
            </Panel>
            <Panel
              ref={editorPanel}
              id="codeEditor"
              collapsible={true}
              defaultSize={50}
              order={2}
              collapsedSize={1}
              onCollapse={setIsCollapsed}
              style={{ transition: isDragging ? "inherit" : ".25s ease-out" }}
            >
              <PanelResizeHandle onDragging={setIsDragging}>
                <Box height="90vh" width="12px" position="absolute">
                  <Box
                    height="95px"
                    width="12px"
                    bgcolor={theme.palette.background.collapse}
                    borderRadius="0 4px 4px 0"
                    top="50%"
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      transition: ".25s ease-out",
                      "&:hover": {
                        opacity: ".6",
                      },
                      "&::after": {
                        content: '""',
                        width: 0,
                        height: 0,
                        transform: isCollapsed ? "rotate(-180deg)" : "inherit",
                        borderStyle: "solid",
                        borderWidth: "4px 0 4px 6px",
                        borderColor:
                          "transparent transparent transparent #b0b0b0",
                      },
                    }}
                    onClick={handleCollapseClick}
                  ></Box>
                </Box>
              </PanelResizeHandle>
              <Box
                p={theme.custom.padding.large}
                borderRadius={`${theme.custom.borderRadius.default} 0 0 ${theme.custom.borderRadius.default}`}
                bgcolor={theme.palette.background.sidebar}
              >
                <CodeManager />
              </Box>
            </Panel>
          </Box>
        </PanelGroup>
      </Box>
    </>
  );
}

export default App;
