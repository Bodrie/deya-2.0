import React from "react";
import { Grid, CardMedia, Typography, Paper } from "@mui/material";
import { ICardContent } from "../../types/types";

const CardComponent = ({ content }: { content: ICardContent[] }) => {
  const styles = (card?: ICardContent) => {
    return {
      paper: {
        borderRadius: "15px",
        width: "fit-content",
        padding: card?.styles ? "0.5rem" : "0px",
      },

      cardMedia: {
        borderRadius: "15px",
        objectFit: "contain",
        height: "auto",
      },
    };
  };

  return (
    <>
      {content.map((card, index: number) => {
        const isLastCard = content.length === index + 1;
        return (
          <Grid
            key={card.title}
            item
            container
            direction={index % 2 === 0 ? "row" : "row-reverse"}
            alignItems="center"
            justifyContent="space-evenly"
            padding={{ xs: "1rem", md: "1rem 0" }}
            marginBottom={isLastCard ? "1rem" : "0rem"}
          >
            <Grid item sm={6} md={6} lg={6} xl={4}>
              <Paper elevation={8} sx={styles(card)}>
                <CardMedia
                  component="img"
                  height="400px"
                  // image={card.img}
                  alt="card component image"
                  sx={styles()}
                />
              </Paper>
            </Grid>
            <Grid item sm={4} md={4}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                margin="2rem 0"
                fontWeight={600}
                letterSpacing={"0.1rem"}
              >
                {card.title}
              </Typography>
              <Typography variant="body1" fontWeight={600}>
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
