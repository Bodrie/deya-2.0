import React from "react";
import { Grid, CardMedia, Typography, Paper } from "@mui/material";
import { ICardContent } from "../../types/types";

const CardComponent = ({ content }: {content: ICardContent[]}) => {
  return (
    <>
      {content.map((card, index: number) => {
        return (
          <Grid
            key={card.title}
            item
            container
            direction={index % 2 === 0 ? "row" : "row-reverse"}
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
                  image={card.img}
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
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.content}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default CardComponent;
