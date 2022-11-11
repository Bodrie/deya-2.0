import React, { useState } from "react";
import { Box, Grid, Tab, Typography, Tabs, Divider } from "@mui/material";
import { sxMbSpacing } from "../../constants/constants";
import Login from "./Login";
import Register from "./Register";
import Social from "./Social";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>("login");

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabValue: string
  ) => {
    setActiveTab(newTabValue);
  };
  return (
    <Grid container justifyContent="center" margin={"2rem 0"} flex={{ xs: 1 }}>
      <Grid item xs={10} sm={8} md={7} lg={5}>
        <Typography
          variant="h6"
          component="p"
          fontWeight={600}
          letterSpacing="0.1rem"
          mb={sxMbSpacing}
        >
          За да използвате услугата за запазване на час е необходимо да се
          регистрирате.
        </Typography>
        <Divider sx={{ marginBottom: sxMbSpacing, backgroundColor: "black" }} />
        <Box sx={{ width: "100%", marginBottom: sxMbSpacing }}>
          <Tabs
            indicatorColor="secondary"
            value={activeTab}
            onChange={handleTabChange}
          >
            <Tab disableRipple value="login" label="Вход" />
            <Tab disableRipple value="register" label="Регистрация" />
          </Tabs>
        </Box>
        <Box
          sx={{
            position: "relative",
            minHeight: "21.5rem",
            overflow: "hidden",
          }}
        >
          <Login active={activeTab} />
          <Register active={activeTab} />
        </Box>
        <Divider sx={{ marginBottom: sxMbSpacing, backgroundColor: "black" }} />
        <Social />
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
