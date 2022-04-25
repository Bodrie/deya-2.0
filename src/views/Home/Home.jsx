import React from "react";
import { Grid, Typography } from "@mui/material";
import { CardComponent, CarouselComponent } from "../../components";

const Home = () => {
  return (
    <Grid container direction="column" justifyContent="center">
      <Grid item>
        <Typography variant="h4" component="h1">
          Енергиини терапии
        </Typography>
      </Grid>
      <Grid item>
        <CarouselComponent />
      </Grid>
      <Grid item>
        <CardComponent></CardComponent>
      </Grid>
    </Grid>
  );
};

export default Home;
