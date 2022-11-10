import { Box, TextField, Button, Paper, Slide, useTheme } from "@mui/material";
import React from "react";
import { sxMbSpacing } from "../../constants/constants";
import { signIn } from "../../firebase";
import bgimg from "../../assets/images/patternpad.svg";

interface LoginProps {
  active: string;
}

const Login = ({ active }: LoginProps) => {
  const theme = useTheme();
  const signInUser = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();   
    const email: string = e.currentTarget.email.value;
    const password: string = e.currentTarget.password.value;
    signIn(email, password);
  };
  return (
    <Slide
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
            />
            <TextField
              id="password"
              variant="outlined"
              label="Парола"
              type="password"
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
