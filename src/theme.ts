import { PaletteOptions, createTheme } from "@mui/material";

type ColorsObject = {
	background: {
		default: string;
		dark: string;
		sidebar: string;
    collapse: string;
	};
	gradient: {
		red: string;
		blue: string;
	};
  border: {
    light: string;
  }
};

type CustomVariables = {
	borderRadius: {
		default: string;
		small: string;
	};
	block: {
		minWidth: string;
		maxWidth: string;
		bodyHeight: string;
		barHeight: string;
		fontSize: {
			body: string;
			bar: string;
		};
	};
	padding: {
		default: string;
		large: string;
	};
};

declare module "@mui/material/styles" {
	interface TypeBackground {
		default: string;
		dark: string;
		paper: string;
		sidebar: string;
    collapse: string;
	}

	interface Theme {
		custom: CustomVariables;
	}

	interface ThemeOptions {
		custom: CustomVariables;
	}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Palette extends ColorsObject { }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PaletteOptions extends ColorsObject { }
}

const palette: PaletteOptions = {
	background: {
		default: "#282828",
		dark: "#212121",
		sidebar: "#2D2D2D",
		paper: "#343434",
    collapse: "#3F3F3F",
	},
	text: {
		primary: "#ffffff",
	},
	border: {
		light: "#4A4A4A",
	},
	gradient: {
		red: "linear-gradient(30deg, #F20486, #FF6068)",
		blue: "linear-gradient(#AB6FFF, #68DBFD)",
	},
};

const custom: CustomVariables = {
	borderRadius: {
		default: "23px",
		small: "8px",
	},
	padding: {
		default: "12px",
		large: "30px",
	},
	block: {
		minWidth: "230px",
		maxWidth: "300px",
		bodyHeight: "100px",
		barHeight: "30px",
		fontSize: {
			body: "20px",
			bar: "15px",
		},
	},
};

export const theme = createTheme({
  palette: {
    ...palette,
    mode: 'dark'
  },
  custom,
  typography: {
    fontFamily: "Inconsolata",
  },
});
