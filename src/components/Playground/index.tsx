import { Box } from "@mui/material";
import { BlockId, BlocksStruct } from "../../shared/structure"
import { BlockGenerator } from "./BlockGenerator";

const map = {"start": {
  1: {2: "end-1"},
  3: { 4 : {5: "end-2",
            6: {7: null}}},
  8: null
}} as any; // eslint-disable-line @typescript-eslint/no-explicit-any

const recursiveGenerator = (id: BlockId, struct: BlocksStruct) => {
  const children = struct[id] as BlocksStruct | string | null;

  console.log("children", children, typeof children)
  if (children instanceof Object) {
    return (
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <BlockGenerator id={id} />
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "20px",
        }}>
          {Object.keys(children).map((blockId) => {
            console.log(blockId)
            return recursiveGenerator(blockId, children);
          })}
        </Box>
      </Box>
    );
  } else {
    return (
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px",
        rowGap: "20px",
      }}>
        <BlockGenerator id={id} />
        <BlockGenerator id={children as BlockId} />
      </Box>
    );
  }
}

export const Playground = () => {
  const structure = map;
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      {recursiveGenerator("start", structure)}
    </Box>
  )
}