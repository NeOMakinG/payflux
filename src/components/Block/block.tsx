import { Box, Card, Typography, useTheme } from "@mui/material"
import { BlockProps } from "./types"


export const Block = ({ type, content, topBar, bottomBar, dot }: BlockProps) => {
	const theme = useTheme();

	const bodyText = content ? content.name : type;

	return (
		<Box
			sx={{
				position: "relative",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{dot && (dot === "top" || dot === "both") && (
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
			)}
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
						padding: "10px 20px",
					}}
				>
					<Typography
						variant="h6"
						style={{
							fontSize: "12px",
							background: theme.palette.gradient.red,
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
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
		</Box>
	);
}
