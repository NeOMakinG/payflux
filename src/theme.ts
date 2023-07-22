import { PaletteOptions, createTheme } from "@mui/material";

type ColorsObject = {
	background: {
		default: string;
		dark: string;
		sidebar: string;
	};
	gradient: {
		red: string;
	};
};

type CustomVariables = {
	borderRadius: {
		default: string;
    small: string;
	};
};

declare module "@mui/material/styles" {

  interface TypeBackground {
		default: string;
		dark: string;
    paper: string;
		sidebar: string;
	}


  interface ThemeOptions {
		custom: CustomVariables;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Palette extends ColorsObject {}
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface PaletteOptions extends ColorsObject {}
}

const palette: PaletteOptions = {
	background: {
		default: "#282828",
		dark: "#212121",
		sidebar: "#2D2D2D",
	},
	gradient: {
		red: "linear-gradient(30deg, #f20486, #ff6068)",
	},
};

const custom: CustomVariables = {
  borderRadius: {
    default: "23px",
    small: "8px"
  }
};

export const theme = createTheme({
	palette,
	custom,
	typography: {
		fontFamily: "Inconsolata",
	},
});
