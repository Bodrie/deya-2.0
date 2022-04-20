import React from "react";
import { Grid, Typography } from "@mui/material";
import { CarouselComponent } from "../../components";

const Home = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h4" component="h1">
          Енергиини терапии
        </Typography>
      </Grid>
      <CarouselComponent />
    </Grid>
  );
};

export default Home;
