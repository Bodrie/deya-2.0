import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../../firebase";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { sxMbSpacing } from "../../constants/constants";

const Auth = () => {
  const googleLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(user);
        console.log(token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
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
        <Typography variant="body1" component={"p"} color="whitesmoke">
          Вашите данни ще бъдат обработвани само и единствено за нуждите и
          целите на осъществяване на конкатк между двете лица, лицето
          предоставящо даните и ползвател на услугата е потребителя на услугата,
          лицето обработващо даните е доставчикът на услугата. Сайтът използва
          'cookies' или т.нар. 'бисквитки', които са необходими за нормалното
          функциониране и ползване на сайта.
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Auth;
