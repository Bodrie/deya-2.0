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
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "white"
        }
      }
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
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: "white",
          textAlign: "center",
          cursor: "pointer",
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
