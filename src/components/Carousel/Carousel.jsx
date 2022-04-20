import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography } from "@mui/material";

const CarouselComponent = (props) => {
  const items = [
    {
      name: "Инфо текст 1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Инфо текст 2",
      description: "Hello World!",
    },
    {
      name: "Инфо текст 3",
      description: "Hello World! x3",
    },
  ];

  return (
    <Carousel height={150} fullHeightHover>
      {items.map((item, i) => (
        <CarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
};

const CarouselItem = (props) => {
  return (
    <Paper>
      <Typography variant="h5" component={"h2"}>
        {props.item.name}
      </Typography>
      <Typography variant="body1" component={"p"}>
        {props.item.description}
      </Typography>
      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
};

export default CarouselComponent;
