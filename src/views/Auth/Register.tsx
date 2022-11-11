import { Box, TextField, Button, Paper, Slide, useTheme } from "@mui/material";
import React, { useState } from "react";
import { sxMbSpacing } from "../../constants/constants";
import { signUp } from "../../firebase";
import bgimg from "../../assets/images/patternpad.svg";
import { ICustomError } from "../../types/types";

interface RegisterProps {
  active: string;
}

const Register = ({ active }: RegisterProps) => {
  const theme = useTheme();
  const [error, setError] = useState<ICustomError>({
    error: undefined,
    errorMsg: undefined,
  });

  const signUpUser = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const email: string = e.currentTarget.createEmail.value;
    const password: string = e.currentTarget.createPassword.value;
    signUp(email, password).then((response) => {
      if (response.hasOwnProperty("errorMsg")) {
        setError(response as ICustomError);
      }
    });
  };

  return (
    <Slide
      appear={false}
      timeout={{ enter: 700, exit: 700 }}
      easing={{
        enter: theme.transitions.easing.easeOut,
        exit: theme.transitions.easing.easeOut,
      }}
      direction="left"
      in={active === "register"}
      unmountOnExit
      mountOnEnter
    >
      <Paper
        elevation={5}
        sx={{
          position: "absolute",
          border: "2px solid #873F91",
          borderRadius: "15px",
          padding: "3rem 1rem",
          backgroundImage: `url(${bgimg})`,
          marginBottom: sxMbSpacing,
          width: "fill-available",
        }}
      >
        <form onSubmit={(e) => signUpUser(e)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <TextField
              id="createEmail"
              variant="outlined"
              label="Имейл"
              type="email"
              error={error.error === 0}
              onInputCapture={() =>
                setError({ error: undefined, errorMsg: undefined })
              }
              sx={{ position: "relative" }}
              helperText={
                <span
                  style={{
                    display: error.error === 0 ? "inherit" : "none",
                    position: "absolute",
                    top: 57,
                    left: 5,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    letterSpacing: "0.07rem",
                  }}
                >
                  {error.errorMsg}
                </span>
              }
            />
            <TextField
              id="createPassword"
              variant="outlined"
              label="Парола"
              type="password"
              error={error.error === 1}
              onInputCapture={() =>
                setError({ error: undefined, errorMsg: undefined })
              }
              sx={{ position: "relative" }}
              helperText={
                <span
                  style={{
                    display: error.error === 1 ? "inherit" : "none",
                    position: "absolute",
                    top: 57,
                    left: 5,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    letterSpacing: "0.07rem",
                  }}
                >
                  {error.errorMsg}
                </span>
              }
            />
            <Button type="submit" variant="contained">
              Регистряция
            </Button>
          </Box>
        </form>
      </Paper>
    </Slide>
  );
};

export default Register;
