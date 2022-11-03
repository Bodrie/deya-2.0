import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { HorizontalRule } from "@mui/icons-material";
import coruselImg1 from "../../assets/images/carousel-img/slide-1.jpg";
import coruselImg2 from "../../assets/images/carousel-img/slide-2.jpg";
import coruselImg3 from "../../assets/images/carousel-img/slide-3.jpg";
import { ICarouselItems } from "../../types/types";

const CarouselComponent = () => {
  const theme = useTheme();
  const smDownMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const items: ICarouselItems[] = [
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
      interval={7000}
      animation="slide"
      duration={800}
      navButtonsAlwaysVisible={smDownMatch ? false : true}
      navButtonsProps={!smDownMatch ? { style: { opacity: 0.6 } } : undefined}
      IndicatorIcon={
        <HorizontalRule fontSize="large" sx={{ margin: "0 5px 0 5px" }} />
      }
      activeIndicatorIconButtonProps={{
        style: { color: theme.palette.text.secondary },
      }}
      indicatorContainerProps={{
        style: { position: "absolute", bottom: 10, zIndex: 1 },
      }}
    >
      {items.map((item, i) => (
        <CarouselItem key={i} {...item} />
      ))}
    </Carousel>
  );
};

const CarouselItem = ({ name, description, img }: ICarouselItems) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <Paper
        sx={{
          height: "25rem",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          position: "absolute",
          zIndex: 2000,
          top: 145,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            component="p"
            color={theme.palette.text.secondary}
          >
            {name}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body1"
            component="p"
            color={theme.palette.text.secondary}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CarouselComponent;
