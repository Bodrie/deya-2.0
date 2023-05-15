import React from "react";
import {
  AppBar,
  Container,
  CardMedia,
  Grid,
  Typography,
  Divider,
  useTheme,
  Theme,
} from "@mui/material";
import { FacebookOutlined } from "@mui/icons-material";
import logo from "../../assets/images/logo/logo.png";
import { facebookLink } from "../../constants/constants";

const Footer = () => {
  const theme = useTheme();
  const { appBar, cardMedia, divider, anchor, fbIcon } = styles(theme);
  
  return (
    <AppBar position="relative" component={"footer"} sx={appBar}>
      <Container maxWidth="xl">
        <Grid container justifyContent="center" wrap="nowrap" mt={2} mb={2}>
          <Grid item>
            <CardMedia image={logo} sx={cardMedia} />
          </Grid>
          <Divider orientation="vertical" flexItem sx={divider} />
          <Grid item alignSelf="center">
            <Grid item container>
              <Typography color="white">info@deya.bg</Typography>
              <Divider orientation="vertical" flexItem sx={divider} />
              <a
                href={facebookLink}
                target="_blank"
                rel="noreferrer"
                style={anchor}
              >
                <FacebookOutlined sx={fbIcon} />
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

const styles = (theme: Theme) => {
  return {
    appBar: { top: "unset", bottom: 0 },

    cardMedia: { height: "90px", width: "90px" },

    divider: {
      backgroundColor: theme.palette.primary.contrastText,
      margin: "0 1rem 0 1rem",
    },

    anchor: { display: "contents" },

    fbIcon: { color: "white" },
  };
};

export default Footer;
