import React from "react";
import { Grid, CardMedia, Typography, Paper } from "@mui/material";

const CardComponent = ({ content }) => {
  return (
    <>
      {content.map((el, i) => {
        return (
          <Grid
            key={el.title}
            item
            container
            direction={i % 2 === 0 ? "row" : "row-reverse"}
            mt={3}
            alignItems="center"
            justifyContent="space-evenly"
            padding="1rem 0 1rem 0"
          >
            <Grid item sm={6} md={6}>
              <Paper elevation={8} sx={{ borderRadius: "15px" }}>
                <CardMedia
                  component="img"
                  height="400px"
                  image={el.img}
                  alt="card component image"
                  sx={{ borderRadius: "15px" }}
                />
              </Paper>
            </Grid>
            <Grid item sm={4} md={4}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                paddingTop="1rem"
              >
                {el.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {el.content}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default CardComponent;
