import { Box, TextField, Button, Paper, Slide, useTheme } from "@mui/material";
import React from "react";
import { sxMbSpacing } from "../../constants/constants";
import { signUp } from "../../firebase";
import bgimg from "../../assets/images/patternpad.svg";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  active: string;
}

const Register = ({ active }: RegisterProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const signUpUser = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const email: string = e.currentTarget.createEmail.value;
    const password: string = e.currentTarget.createPassword.value;
    signUp(email, password);
    navigate("/");
  };
  
  return (
    <Slide
      timeout={{enter: 700, exit: 700}}
      easing={{
        enter: theme.transitions.easing.easeOut,
        exit: theme.transitions.easing.easeOut,
      }}
      direction="left"
      in={active === "register"}
      unmountOnExit
      mountOnEnter
    >
      <Paper elevation={5} sx={{ borderRadius: "15px" }}>
        <Box
          mb={sxMbSpacing}
          sx={{
            position: "absolute",
            border: "2px solid #873F91",
            borderRadius: "15px",
            padding: "3rem 1rem",
            backgroundImage: `url(${bgimg})`,
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
              />
              <TextField
                id="createPassword"
                variant="outlined"
                label="Парола"
                type="password"
              />
              <Button type="submit" variant="contained">
                Регистряция
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Slide>
  );
};

export default Register;
