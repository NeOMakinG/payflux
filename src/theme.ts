import { PaletteOptions, createTheme } from "@mui/material";

type ColorsObject = {
  background: {
    default: string;
    dark: string;
    sidebar: string;
  };
  border: {
    light: string;
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
  padding: {
    default: string;
    large: string;
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
};

declare module "@mui/material/styles" {
  interface TypeBackground {
    default: string;
    dark: string;
    paper: string;
    sidebar: string;
  }

  interface Theme {
    custom: CustomVariables;
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
  border: {
    light: "#4A4A4A",
  },
  text: {
    primary: "#ffffff",
  },
  gradient: {
    red: "linear-gradient(30deg, #F20486, #FF6068)",
  },
};

const custom: CustomVariables = {
  borderRadius: {
    default: "23px",
    small: "12px",
  },
  padding: {
    default: "12px",
    large: "30px",
  },
  block: {
    minWidth: "200px",
    maxWidth: "250px",
    bodyHeight: "60px",
    barHeight: "30px",
    fontSize: {
      body: "20px",
      bar: "14px",
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
