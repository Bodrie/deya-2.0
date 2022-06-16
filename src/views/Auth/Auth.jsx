import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../../firebase";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { sxMbSpacing } from "../../constants/constants";

const Auth = () => {
  const navigate = useNavigate();
  const googleLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={8} md={7} lg={6}>
        <Typography
          variant="h6"
          component={"p"}
          color="whitesmoke"
          mb={sxMbSpacing}
        >
          За да използвате услугата за запазване на час е необходимо да се
          впишете с вашият Goggle профил
        </Typography>
        <Box mb={sxMbSpacing}>
          <Button variant="contained" onClick={googleLogin}>
            Вход с Google
            <Google sx={{ ml: 2 }} />
          </Button>
        </Box>
        <Typography
          variant="body1"
          component={"p"}
          color="whitesmoke"
          mb={sxMbSpacing}
        >
          Вашите данни ще бъдат обработвани само и единствено за нуждите и
          целите на осъществяване на контакт между двете лица, лицето
          предоставящо даните и ползвател на услугата (Вие) е потребителя на
          услугата, лицето обработващо даните е доставчикът на услугата. Сайтът
          използва 'cookies' или т.нар. 'бисквитки', които са необходими за
          нормалното функциониране и ползване на сайта.
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Auth;
