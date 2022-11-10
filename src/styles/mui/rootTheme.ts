import { createTheme } from "@mui/material";

const rootTheme = createTheme({
  typography: {
    fontFamily: "Mulish",
  },
  palette: {
    // #c782ce
    primary: {
      main: "#b771c1",
      light: "#9B5FA3",
      dark: "#6D3274",
      contrastText: "#FEC01F",
    },
    text: {
      primary: "#000",
      secondary: "#000",
      disabled: "#999999",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "25px",
          "&:hover": {
            fontWeight: "bold",
            color: "#873F91",
            backgroundColor: "#FEC01F",
          },
        },
        outlinedPrimary: {
          color: "#FEC01F",
        },
        contained: {
          color: "white",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "black",
          textAlign: "center",
          cursor: "text",
          backgroundColor: "white",
          ":hover": {
            "& fieldset": {
              borderColor: "#873F91 !important",
            },
          },
        },
        notchedOutline: {
          border: "2px solid #873F91",
          borderRadius: "15px",
        },
      },
    },
  },
});

export default rootTheme;
