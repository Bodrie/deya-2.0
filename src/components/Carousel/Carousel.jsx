import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import { HorizontalRule } from "@mui/icons-material";
import coruselImg1 from "../../assets/images/carousel-img/slide-1.jpg";
import coruselImg2 from "../../assets/images/carousel-img/slide-2.jpg";
import coruselImg3 from "../../assets/images/carousel-img/slide-3.jpg";

const CarouselComponent = (props) => {
  const theme = useTheme();
  const items = [
    {
      name: "Рейки",
      description:
        "Двуканална Система на Микао Усуи | Рейки сеанс | Рейки Обучение и Инициация",
      img: coruselImg1,
    },
    {
      name: "Тета лечение",
      description: "Тета сесия",
      img: coruselImg2,
    },
    {
      name: "Масажи",
      description: "Масажи с вулканични камани",
      img: coruselImg3,
    },
  ];

  return (
    <Carousel
      interval={50000}
      navButtonsAlwaysVisible
      navButtonsProps={{ style: { opacity: 0.6 } }}
      IndicatorIcon={
        <HorizontalRule fontSize="large" sx={{ margin: "0 5px 0 5px" }} />
      }
      activeIndicatorIconButtonProps={{
        style: { color: theme.palette.text.secondary },
      }}
      indicatorContainerProps={{
        style: { position: "absolute", bottom: 10, zIndex: 5000 },
      }}
    >
      {items.map((item, i) => (
        <CarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
};

const CarouselItem = (props) => {
  const theme = useTheme();
  return (
    <Paper sx={{ backgroundColor: "black", borderRadius: "13px" }}>
      <Paper
        sx={{
          height: "25rem",
          borderRadius: "13px",
          backgroundImage: `url(${props.item.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />
      <Box sx={{ position: "absolute", bottom: 175, left: 100 }}>
        <Typography
          variant="h3"
          component="p"
          color={theme.palette.text.secondary}
        >
          {props.item.name}
        </Typography>
      </Box>
      <Box sx={{ position: "absolute", bottom: 130, left: 103 }}>
        <Typography
          variant="body1"
          component="p"
          color={theme.palette.text.secondary}
        >
          {props.item.description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CarouselComponent;