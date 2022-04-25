import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography, CardMedia } from "@mui/material";
import coruselImg1 from "../../assets/images/carousel-img/slide-1.jpg";
import coruselImg2 from "../../assets/images/carousel-img/slide-2.jpg";
import coruselImg3 from "../../assets/images/carousel-img/slide-3.jpg";

const CarouselComponent = (props) => {
  const items = [
    {
      name: "Инфо текст 1",
      description: "Probably the most random thing you have ever seen!",
      img: coruselImg1,
    },
    {
      name: "Инфо текст 2",
      description: "Hello World!",
      img: coruselImg2,
    },
    {
      name: "Инфо текст 3",
      description: "Hello World! x3",
      img: coruselImg3,
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <CarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
};

const CarouselItem = (props) => {
  return (
    <Paper>
      <CardMedia
        image={props.item.img}
        sx={{
          height: {
            xs: "35vw",
            sm: "30vw",
            md: "25vw",
            lg: "20vw",
            xl: "15vw",
          },
        }}
      >
        <Typography variant="h5" component={"h2"}>
          {props.item.name}
        </Typography>
        <Typography variant="body1" component={"p"}>
          {props.item.description}
        </Typography>
        <Button className="CheckButton">Check it out!</Button>
      </CardMedia>
    </Paper>
  );
};

export default CarouselComponent;
