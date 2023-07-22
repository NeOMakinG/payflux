import { Box } from "@mui/material";
import { TooltipWrapperProps } from "./type";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { useRef, useState } from "react";

export function TooltipWrapper({ children, label }: TooltipWrapperProps) {
	const anchorEl = useRef<null | HTMLElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const onMouseIn = () => {
		setIsOpen(true);
	};

	const onMouseOut = () => {
		setIsOpen(false);
	};

	return (
		<>
			<Box
				display={"inline-flex"}
				ref={anchorEl}
				onMouseOut={onMouseOut}
				onMouseOver={onMouseIn}
			>
				{children}
			</Box>
			<Popper
				open={isOpen}
				anchorEl={anchorEl.current}
				transition
				placement="left"
			>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<Box
							sx={{
								bgcolor: "background.paper",
								padding: "8px",
								border: `2px solid #474747`,
								borderRadius: "4px",
								marginLeft: "12px",
								position: "relative",
							}}
						>
							<Box
								sx={{
                  display: "inline-flex",
									position: "absolute",
									left: "0",
									top: "50%",
									transform: "translateY(-50%) translateX(-100%)",
									width: "12px",
									height: "12px",
								}}
							>
								<svg
									width="12"
									height="12"
									viewBox="0 0 39 44"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1.625 23.3571C0.291668 22.5873 0.291666 20.6627 1.625 19.8929L35.375 0.407378C36.7083 -0.362423 38.375 0.599826 38.375 2.13943L38.375 41.1106C38.375 42.6502 36.7083 43.6124 35.375 42.8426L1.625 23.3571Z"
										fill="#474747"
									/>
								</svg>
							</Box>

							{label}
						</Box>
					</Fade>
				)}
			</Popper>
		</>
	);
}
