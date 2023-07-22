import { Box, Card, Typography, useTheme } from "@mui/material"
import { BlockProps } from "./types"


export const Block = ({ type, func, cond, topBar, bottomBar }: BlockProps) => {
    const theme = useTheme();

    let bodyText = type as string;
    if (func || cond) {
        bodyText = (func ? func.name : "") || (cond ? cond.name : "");
    } 

    return (
        <Card sx={{
            minWidth: theme.custom.block.minWidth,
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
        }}>
            {topBar && (
                <Box sx={{
                    height: theme.custom.block.barHeight,
                    width: "100%",
                    backgroundColor: theme.palette.background.default,
                    borderBottom: 1,
                    borderColor: theme.palette.background.sidebar
                }}/>
            )}
            <Box sx={{
                height: theme.custom.block.bodyHeight,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Typography variant="h6" style={{
                    fontSize: theme.custom.block.fontSize.body,
                    background: theme.palette.gradient.red,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    {bodyText}
                </Typography>
            </Box>
            {bottomBar && (
                <Box sx={{
                    height: theme.custom.block.barHeight,
                    width: "100%",
                    backgroundColor: theme.palette.background.default,
                    borderTop: 1,
                    borderColor: theme.palette.background.sidebar
                }}/>
            )}
        </Card>
    )
}
