import { createTheme } from "@mui/material";

const rootTheme = createTheme({
  typography: {
    fontFamily: "Mulish",
  },
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
            color: "#873F91",
            backgroundColor: "#FEC01F",
            border: "1px solid #873F91",
          },
        },
        outlinedPrimary: {
          color: "#FEC01F",
          border: "1px solid #FEC01F",
        },
      },
    },
  },
});

export default rootTheme;
