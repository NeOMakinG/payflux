import { Box, Card, Typography, useTheme } from "@mui/material";

type BlockPresenterProps = {
  bodyText: string;
  onClick: () => void;
};

export const BlockPresenter: React.FC<BlockPresenterProps> = ({
  bodyText,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: theme.custom.block.maxWidth,
        backgroundColor: theme.palette.background.dark,
        color: theme.palette.text.primary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",

        border: "2px solid transparent",
        borderRadius: theme.custom.borderRadius.small,
        backgroundImage: `linear-gradient(${theme.palette.background.dark}, ${theme.palette.background.dark}), ${theme.palette.gradient.red}`,
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
        position: "relative",
        transition: ".25s ease-out",
        cursor: "pointer",
        "&:hover": {
          opacity: ".8",
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 20px",
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontSize: "14px",
            background: theme.palette.gradient.red,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          {bodyText}
        </Typography>
      </Box>
    </Card>
  );
};
