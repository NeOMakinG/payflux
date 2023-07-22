import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  useTheme,
} from "@mui/material";
import FunctionsIcon from "@mui/icons-material/Functions";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { usePayfluxStore } from "../../zustand";
import { PlusButtonProps } from "./types";
import { BlockType } from "../../shared/functions";

export const PlusButton = ({ id }: PlusButtonProps) => {
  const theme = useTheme();
  const { setBlockModal } = usePayfluxStore((state) => ({
    blockIdToProps: state.blockIdToProps,
    addChild: state.addChild,
    setBlockIdToProps: state.setBlockIdToProps,
    setBlockModal: state.setBlockModal,
  }));

  const actions = [
    {
      icon: <FunctionsIcon />,
      name: "Functions",
      action: () => setBlockModal({ type: BlockType.FUNCTION, id }),
    },
    {
      icon: <QuestionMarkIcon />,
      name: "Conditions",
      action: () => setBlockModal({ type: BlockType.CONDITION, id }),
    },
  ];

  return (
    <SpeedDial
      ariaLabel="Plus"
      FabProps={{
        sx: {
          backgroundImage: theme.palette.gradient.red,
          color: theme.palette.text.primary,
        },
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
  );
};
