import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import { CardComponent, CarouselComponent } from "../../components";
import content from "../../mock/home-cards.json";

const Home = () => {
  const theme = useTheme();

  return (
    <Grid container direction="column" justifyContent="center">
      {/* <Grid item>
        <Typography
          variant="h4"
          component="h1"
          color={theme.palette.text.secondary}
        >
          "ДЕЯ" - Енергиини терапии
        </Typography>
      </Grid> */}
      <Grid item>
        <CarouselComponent />
      </Grid>
      <CardComponent content={content} />
    </Grid>
  );
};

export default Home;
