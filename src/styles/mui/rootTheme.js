import { createTheme } from "@mui/material";

const rootTheme = createTheme({
  palette: {
    primary: {
      main: "#873F91",
      light: "#9B5FA3",
      dark: "#6D3274",
    },
    text: {
      primary: "#000000",
      secondary: "#FEC01F",
      disabled: "#999999",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "#000000",
            backgroundColor: "#FEC01F",
          },
        },
      },
    },
  },
});

export default rootTheme;
