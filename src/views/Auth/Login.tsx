import { Box, TextField, Button, Paper, Slide, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { sxMbSpacing } from "../../constants/constants";
import { signIn } from "../../firebase";
import bgimg from "../../assets/images/patternpad.svg";
import { ICustomError } from "../../types/types";
import LoadingContext from "../../context/LoadingContext";

interface LoginProps {
  active: string;
}

const Login = ({ active }: LoginProps) => {
  const theme = useTheme();
  const { setIsLoading } = useContext(LoadingContext);
  const [error, setError] = useState<ICustomError>({
    error: undefined,
    errorMsg: undefined,
  });
  const signInUser = (e: React.BaseSyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const email: string = e.currentTarget.email.value;
    const password: string = e.currentTarget.password.value;
    signIn(email, password)
      .then((response) => {
        if (response.hasOwnProperty("errorMsg")) {
          setIsLoading(false);
          setError(response as ICustomError);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Slide
      appear={false}
      timeout={{ enter: 700, exit: 700 }}
      direction="right"
      in={active === "login"}
      easing={{
        enter: theme.transitions.easing.easeOut,
        exit: theme.transitions.easing.easeOut,
      }}
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
        <form onSubmit={(e) => signInUser(e)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <TextField
              id="email"
              variant="outlined"
              label="Имейл"
              type="email"
              autoComplete="current-email"
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
              id="password"
              variant="outlined"
              label="Парола"
              type="password"
              autoComplete="current-password"
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
              Вход
            </Button>
          </Box>
        </form>
      </Paper>
    </Slide>
  );
};

export default Login;
