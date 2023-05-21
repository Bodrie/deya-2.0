import { createTheme } from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";

const rootTheme = createTheme({
  typography: {
    fontFamily: "Mulish",
  },
  // palette: {
  //   primary: {
  //     main: "#b771c1",
  //     light: "#9B5FA3",
  //     dark: "#6D3274",
  //     contrastText: "#FEC01F",
  //   },
  //   text: {
  //     primary: "#000",
  //     secondary: "#000",
  //     disabled: "#999999",
  //   },
  // },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          "& .MuiCalendarPicker-root": {
            "& div[role=cell]": {
              "& :not(.Mui-disabled).MuiPickersDay-dayWithMargin": {
                color: "#FEC01F",
                fontSize: "20px",
                fontWeight: 600,
              },
            },
          },
          "& .MuiClockPicker-root": {
            "& div[role=listbox]": {
              "& :not(.Mui-disabled)": {
                fontSize: "17px",
                fontWeight: 600,
                color: "#6D3274",
                border: "#FEC01F solid 2px",
                boxSizing: "border-box",
              },
              "& .Mui-selected": {
                fontSize: "18px",
                fontWeight: 600,
                color: "#FEC01F",
                border: "none",
              },
              "& .Mui-disabled": {
                color: "lightgray",
              },
            },
          },
        },
      },
    },
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
