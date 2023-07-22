import { SpeedDial, SpeedDialAction, SpeedDialIcon, useTheme } from "@mui/material"
import FunctionsIcon from '@mui/icons-material/Functions';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export const PlusButton = () => {
  const theme = useTheme();

  const actions = [
    { icon: <FunctionsIcon />, name: 'Functions' },
    { icon: <QuestionMarkIcon />, name: 'Conditions' },
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
        />
      ))}
    </SpeedDial>
  )
}