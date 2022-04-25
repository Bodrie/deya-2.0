import React from "react";
import { AppBar, Container, CardMedia, Grid, Typography } from "@mui/material";
import { FacebookOutlined } from "@mui/icons-material";
import logo from "../../assets/images/logo/logo.png";

const Footer = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Grid container justifyContent="center" mt={2} mb={2}>
          <Grid item container direction="column">
            <Grid item>
              <Typography>
                info@deya.bg | <FacebookOutlined /> ДЕЯ
              </Typography>
            </Grid>
            <Grid item>
              <Typography>Емилия Христова</Typography>
            </Grid>
            <Grid item>
              <Typography>+(359) 0878774806</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <CardMedia image={logo} sx={{ height: "90px", width: "90px" }} />
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Footer;
