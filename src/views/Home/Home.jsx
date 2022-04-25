import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import { CardComponent, CarouselComponent } from "../../components";

const Home = () => {
  const theme = useTheme();
  return (
    <Grid container direction="column" justifyContent="center">
      <Grid item mt={3}>
        <Typography
          variant="h4"
          component="h1"
          color={theme.palette.text.secondary}
        >
          "ДЕЯ" - Енергиини терапии
        </Typography>
      </Grid>
      <Grid item mt={3}>
        <CarouselComponent />
      </Grid>
      <Grid item mt={3}>
        <CardComponent />
      </Grid>
    </Grid>
  );
};

export default Home;
