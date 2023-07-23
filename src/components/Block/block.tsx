import {
  Box,
  Card,
  CardActionArea,
  Grow,
  Typography,
  useTheme,
} from "@mui/material";
import { BlockProps } from "./types";
import { usePayfluxStore } from "../../zustand";

export const Block = ({
  type,
  mode,
  topBar,
  bottomBar,
  onClickDelete,
  onClick,
}: BlockProps) => {
  const theme = useTheme();
  const { setHoveringMode } = usePayfluxStore((state) => ({
    setHoveringMode: state.setHoveringMode,
  }));

  const bodyText = mode ?? type;

  return (
    <Box
      className="tf-nc"
      sx={{
        position: "relative",

        "&:hover ": {
          "& .block-close": {
            opacity: 1,
            transform: "translate(50%, -50%) scale(1)",
          },
        },
      }}
    >
      {/* CLOSE BTN */}
      {onClickDelete && (
        <CardActionArea onClick={onClickDelete}>
          <Box
            className="block-close"
            sx={{
              opacity: 0,
              zIndex: 2,
              position: "absolute",
              right: 0,
              top: 0,
              background: "#F20486",
              width: "20px",
              height: "20px",
              borderRadius: "100%",
              transform: "translate(50%, -50%) scale(0)",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "opacity 0.4s, background 0.4s",
              ":hover": {
                background: "#FF6068",
              },
            }}
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 10.121L13.303 15.425C13.5844 15.7064 13.966 15.8645 14.364 15.8645C14.762 15.8645 15.1436 15.7064 15.425 15.425C15.7064 15.1436 15.8645 14.762 15.8645 14.364C15.8645 13.9661 15.7064 13.5844 15.425 13.303L10.12 8L15.424 2.697C15.5633 2.55767 15.6737 2.39227 15.7491 2.21025C15.8244 2.02823 15.8632 1.83315 15.8631 1.63615C15.8631 1.43915 15.8242 1.24409 15.7488 1.0621C15.6734 0.880117 15.5628 0.71477 15.4235 0.575503C15.2842 0.436236 15.1188 0.325777 14.9367 0.250431C14.7547 0.175086 14.5596 0.13633 14.3626 0.136376C14.1656 0.136423 13.9706 0.175271 13.7886 0.250702C13.6066 0.326133 13.4413 0.436671 13.302 0.576004L8 5.879L2.697 0.576004C2.5587 0.432674 2.39323 0.318324 2.21027 0.239626C2.0273 0.160927 1.83049 0.119456 1.63132 0.117632C1.43215 0.115808 1.23462 0.153668 1.05024 0.229002C0.865859 0.304336 0.698329 0.415637 0.557424 0.556409C0.416519 0.697181 0.305061 0.864606 0.229553 1.04891C0.154045 1.23322 0.115999 1.43072 0.117635 1.62989C0.119271 1.82906 0.160556 2.02591 0.239082 2.20895C0.317608 2.39199 0.431802 2.55757 0.575001 2.696L5.88 8L0.576001 13.303C0.294607 13.5844 0.13652 13.9661 0.13652 14.364C0.13652 14.762 0.294607 15.1436 0.576001 15.425C0.857396 15.7064 1.23905 15.8645 1.637 15.8645C2.03495 15.8645 2.41661 15.7064 2.698 15.425L8 10.12V10.121Z"
                fill="white"
              />
            </svg>
          </Box>
        </CardActionArea>
      )}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onMouseEnter={() => setHoveringMode(mode ?? null)}
        onMouseLeave={() => setHoveringMode(null)}
        onClick={onClick}
      >
        {/* {dot && (dot === "top" || dot === "both") && (
				<Box
					sx={{
						height: "10px",
						width: "10px",
						borderRadius: "50%",
						backgroundImage: theme.palette.gradient.red,
						position: "absolute",
						zIndex: 1,
						top: "-5px",
					}}
				/>
			)}
			{dot && (dot === "bottom" || dot === "both") && (
				<Box
					sx={{
						height: "10px",
						width: "10px",
						borderRadius: "50%",
						backgroundImage: theme.palette.gradient.red,
						position: "absolute",
						zIndex: 1,
						bottom: "-5px",
					}}
				/>
			)} */}
        <Grow in={true} timeout={500}>
          <Card
            sx={{
              width: theme.custom.block.maxWidth,
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
            }}
          >
            {topBar && (
              <Box
                sx={{
                  height: theme.custom.block.barHeight,
                  width: "100%",
                  backgroundColor: theme.palette.background.default,
                  borderBottom: 1,
                  borderColor: theme.palette.background.sidebar,
                  borderImageSlice: 1,
                  borderImageSource: theme.palette.gradient.red,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingX: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    fontSize: theme.custom.block.fontSize.bar,
                  }}
                >
                  {topBar.text}
                </Typography>
              </Box>
            )}
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
            {bottomBar && (
              <Box
                sx={{
                  height: theme.custom.block.barHeight,
                  width: "100%",
                  backgroundColor: theme.palette.background.default,
                  borderTop: 1,
                  borderImageSlice: 1,
                  borderImageSource: theme.palette.gradient.red,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingX: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    fontSize: theme.custom.block.fontSize.bar,
                  }}
                >
                  {bottomBar.text}
                </Typography>
              </Box>
            )}
          </Card>
        </Grow>
      </Box>
    </Box>
  );
};
