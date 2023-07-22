import { SpeedDial, SpeedDialAction, SpeedDialIcon, useTheme } from "@mui/material"
import FunctionsIcon from '@mui/icons-material/Functions';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { usePayfluxStore } from "../../zustand";
import { PlusButtonProps } from "./types";
import { BlockType } from "../../shared/functions";

export const PlusButton = ({parentId}: PlusButtonProps) => {
  const theme = useTheme();
  const { blockIdToProps, addChild, setBlockIdToProps }= usePayfluxStore(state => ({ blockIdToProps: state.blockIdToProps, addChild: state.addChild, setBlockIdToProps: state.setBlockIdToProps }));

  const addBlock = (type: BlockType) => {
    const newId = (Object.keys(blockIdToProps).length + 1).toString();
    return () => {
      setBlockIdToProps(newId, { type });
      addChild(parentId, newId);
    }
  }

  const actions = [
    { icon: <FunctionsIcon />, name: 'Functions', action: addBlock(BlockType.FUNCTION) },
    { icon: <QuestionMarkIcon />, name: 'Conditions', action: addBlock(BlockType.CONDITION) },
  ]

  return (
    <SpeedDial
      ariaLabel="Plus"
      FabProps={{
        sx: {
          backgroundImage: theme.palette.gradient.red,
          color: theme.palette.text.primary,
        }
      }}
      direction="down"
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
        />
      ))}
    </SpeedDial>
  )
}