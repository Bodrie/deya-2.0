import { Google, Facebook } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { sxMbSpacing } from "../../constants/constants";
import { signInWithFacebook, signInWithGoogle } from "../../firebase";

const Social = () => {
  const facebookLogin = () => {
    signInWithFacebook();
  };
  const googleLogin = () => {
    signInWithGoogle();
  };
  return (
    <Box
      mb={sxMbSpacing}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <Button variant="contained" onClick={googleLogin}>
        Вход с Google
        <Google sx={{ ml: 2 }} />
      </Button>
      <Button variant="contained" onClick={facebookLogin}>
        Вход с Facebook
        <Facebook sx={{ ml: 2 }} />
      </Button>
    </Box>
  );
};

export default Social;
