import React from "react";
import { Grid } from "@mui/material";
import { CardComponent, CarouselComponent } from "../../components";
import content from "../../mock/home-cards.json";

const Home = () => {
  return (
    <Grid container direction="column" justifyContent="center">
      <Grid item marginBottom={"1rem"}>
        <CarouselComponent />
      </Grid>
      <CardComponent content={content} />
    </Grid>
  );
};

export default Home;
