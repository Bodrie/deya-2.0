import React from "react";
import {
  signInWithFacebook,
  signInWithGoogle,
  signIn,
  signUp
} from "../../firebase";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { sxMbSpacing } from "../../constants/constants";

const Auth = () => {
  const signUpUser = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const email: string = e.currentTarget.createEmail.value;
    const password: string = e.currentTarget.createPassword.value;
    signUp(email, password);
  };
  const signInUser = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const email: string = e.currentTarget.email.value;
    const password: string = e.currentTarget.password.value;
    signIn(email, password);
  };
  const facebookLogin = () => {
    signInWithFacebook();
  };
  const googleLogin = () => {
    signInWithGoogle();
  };

  return (
    <Grid container justifyContent="center" margin={"2rem 0"}>
      <Grid item xs={10} sm={8} md={7} lg={6}>
        <Typography
          variant="h6"
          component="p"
          fontWeight={600}
          letterSpacing="0.1rem"
          mb={sxMbSpacing}
        >
          За да използвате услугата за запазване на час е необходимо да се
          впишете с вашият Goggle или Facebook профил.
        </Typography>
        <Box mb={sxMbSpacing}>
          <Typography>Регистрация</Typography>
          <form onSubmit={(e) => signUpUser(e)}>
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
          </form>
        </Box>
        <Box mb={sxMbSpacing}>
          <Typography>Вход</Typography>
          <form onSubmit={(e) => signInUser(e)}>
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
          </form>
        </Box>
        <Box mb={sxMbSpacing}>
          <Button
            variant="contained"
            onClick={googleLogin}
            sx={{ mb: { xs: 2, sm: 0, md: 0 } }}
          >
            Вход с Google
            <Google sx={{ ml: 2 }} />
          </Button>
          <Button variant="contained" onClick={facebookLogin}>
            Вход с Facebook
            <Facebook sx={{ ml: 2 }} />
          </Button>
        </Box>
        <Typography variant="body2" component="p" fontWeight={600}>
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
