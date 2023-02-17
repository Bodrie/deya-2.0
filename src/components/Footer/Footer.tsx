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
import { facebookLink } from "../../constants/constants";

const Footer = () => {
  const theme = useTheme();
  return (
    <AppBar
      position="relative"
      component={"footer"}
      sx={{ top: "unset", bottom: 0 }}
    >
      <Container maxWidth="xl">
        <Grid container justifyContent="center" wrap="nowrap" mt={2} mb={2}>
          <Grid item>
            <CardMedia image={logo} sx={{ height: "90px", width: "90px" }} />
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              backgroundColor: theme.palette.primary.contrastText,
              margin: "0 1rem 0 1rem",
            }}
          />
          <Grid item alignSelf="center">
            <Grid item container>
              <Typography color="white">info@deya.bg</Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  backgroundColor: theme.palette.primary.contrastText,
                  margin: "0 1rem 0 1rem",
                }}
              />
              <a
                href={facebookLink}
                target="_blank"
                rel="noreferrer"
                style={{ display: "contents" }}
              >
                <FacebookOutlined sx={{ color: "white" }} />
                <Typography color="white" ml={0.5}>
                  ДЕЯ
                </Typography>
              </a>
            </Grid>
            <Grid item>
              <Typography color="white">Емилия Христова</Typography>
            </Grid>
            <Grid item>
              <Typography color="white"></Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Footer;
