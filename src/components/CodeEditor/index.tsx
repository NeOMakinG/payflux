import { Box, useTheme } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";

export type Snippet = {
  id: string;
  value:  string;
};

type CodeEditorProps = {
  snippets: Array<Snippet>;
  highlightedIndex?: number;
};

export const CodeEditor: React.FC<CodeEditorProps> = ({
  snippets,
  highlightedIndex,
}) => {
  const theme = useTheme();

  const highlightedStyle = {
    border: "2px solid #9f9000",
    zoom: "1.1",
    margin: "5px 0",
    padding: "2px",
    borderRadius: "10px",
    zIndex: 2,
  };

  return (
    <Box
      borderRadius={theme.custom.padding.large}
      bgcolor={theme.palette.background.dark}
      border={`1px solid ${theme.palette.border.light}`}
      width="100%"
      overflow="auto"
      height="90vh"
      p={4}
    >
      {snippets.map((snippet, index) => (
        <SyntaxHighlighter
          key={index}
          customStyle={{
            margin: 0,
            padding: 0,
            position: "relative",
            border: "1px solid transparent",
            transition: ".25s ease-out",
            width: "min-content",
            overflow: "visible",
            backgroundColor: theme.palette.background.dark,
            ...(index === highlightedIndex ? highlightedStyle : null),
          }}
          style={vscDarkPlus}
          language="solidity"
        >
          {snippet.value}
        </SyntaxHighlighter>
      ))}
    </Box>
  );
};
