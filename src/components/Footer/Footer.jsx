import React from "react";
import {
  AppBar,
  Container,
  CardMedia,
  Grid,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import { FacebookOutlined } from "@mui/icons-material";
import LinkStyled from "../Link/Link";
import logo from "../../assets/images/logo/logo.png";

const Footer = () => {
  const theme = useTheme();
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Grid container justifyContent="center" wrap="nowrap" mt={2} mb={2}>
          <Grid item>
            <CardMedia image={logo} sx={{ height: "90px", width: "90px" }} />
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              backgroundColor: theme.palette.text.secondary,
              margin: "0 1rem 0 1rem",
            }}
          />
          <Grid item alignSelf="center">
            <Grid item container>
              <Typography>info@deya.bg</Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  backgroundColor: theme.palette.text.secondary,
                  margin: "0 1rem 0 1rem",
                }}
              />
              <LinkStyled
                as="a"
                href="https://www.facebook.com/%D0%95%D0%BD%D0%B5%D1%80%D0%B3%D0%B8%D0%B9%D0%BD%D0%B8-%D1%82%D0%B5%D1%80%D0%B0%D0%BF%D0%B8%D0%B8-%D0%94%D0%95%D0%AF-105865118280197"
                target="_blank"
              >
                <FacebookOutlined />
                <Typography ml={0.5}>ДЕЯ</Typography>
              </LinkStyled>
            </Grid>
            <Grid item>
              <Typography>Емилия Христова</Typography>
            </Grid>
            <Grid item>
              <Typography>+(359) 0878774806</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Footer;
