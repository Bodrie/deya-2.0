import React from "react";
import { getAuth, signInWithRedirect } from "firebase/auth";
import { googleProvider, facebookProvider } from "../../firebase";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { sxMbSpacing } from "../../constants/constants";

interface AuthProps {
  setLoading: (newLoadingState: boolean) => void;
}

const Auth = ({ setLoading }: AuthProps) => {
  const facebookLogin = () => {
    setLoading(true);
    const auth = getAuth();
    signInWithRedirect(auth, facebookProvider);
  };
  const googleLogin = () => {
    setLoading(true);
    const auth = getAuth();
    signInWithRedirect(auth, googleProvider);
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
        <Typography
          variant="body2"
          component="p"
          fontWeight={600}
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
