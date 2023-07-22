import { SideBar } from "./components/SideBar";
import { CodeEditor } from "./components/CodeEditor";
import { Box, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import {
	ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from "react-resizable-panels";
import { Playground } from "./components/Playground";

const snippetsMonkeyPatch = [
  {
    id: 1,
    value: `//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import {console} from 'hardhat/console.sol';
import {IGreeter} from '../interfaces/IGreeter.sol';

/// @title A contract for boilerplating
/// @author Hardhat (and DeFi Wonderland)
/// @notice You can use this contract for only the most basic tests
/// @dev This is just a try out
/// @custom:experimental This is an experimental contract.`,
  },
  {
    id: 2,
    value: `contract Greeter is IGreeter {
      string public override greeting;
    
      constructor(string memory _greeting) {
        console.log('Deploying a Greeter with greeting:', _greeting);
        greeting = _greeting;
      }
      function greet() external view override returns (string memory _greet) {
        return greeting;
      }`,
  },
  {
    id: 3,
    value: `  /// @notice Sets greeting that will be used during greet
    /// @dev Some explanation only defined for devs
    /// @param _greeting The greeting to be used
    /// @return _changedGreet Was greeting changed or nah
    function setGreeting(string memory _greeting) external override returns (bool _changedGreet) {
      if (bytes(_greeting).length == 0) revert EmptyGreeting();
      console.log('Changing greeting from', greeting, 'to', _greeting);
      greeting = _greeting;
      _changedGreet = true;
      emit GreetingSet(_greeting);
    }
    function setGreeting(string memory _greeting) external override returns (bool _changedGreet) {
      if (bytes(_greeting).length == 0) revert EmptyGreeting();
      console.log('Changing greeting from', greeting, 'to', _greeting);
      greeting = _greeting;
      _changedGreet = true;
      emit GreetingSet(_greeting);
    }
    function setGreeting(string memory _greeting) external override returns (bool _changedGreet) {
      if (bytes(_greeting).length == 0) revert EmptyGreeting();
      console.log('Changing greeting from', greeting, 'to', _greeting);
      greeting = _greeting;
      _changedGreet = true;
      emit GreetingSet(_greeting);
    }
  }`,
	},
];

function App() {
	const theme = useTheme();
	const editorPanel = useRef<ImperativePanelHandle>(null);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

  const handleCollapseClick = () => {
    if (editorPanel.current?.getSize() === 1) {
      editorPanel.current?.expand();
      editorPanel.current?.resize(50);
      return;
    }

		editorPanel.current?.collapse();
	};

  return (
    <>
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
						>
							<Box position={"absolute"}>
								<Playground />
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
                <CodeEditor
                  highlightedIndex={1}
                  snippets={snippetsMonkeyPatch}
                />
              </Box>
            </Panel>
          </Box>
        </PanelGroup>
      </Box>
    </>
  );
}

export default App;
