import React from "react";
import { Grid, CardMedia, Typography } from "@mui/material";
import img from "../../assets/images/carousel-img/slide-1.jpg";

const CardComponent = () => {
  return (
    <>
      <Grid item sm={4} md={4}>
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt="snimka na kartichkata"
        />
      </Grid>
      <Grid item sm={8} md={8}>
        <Typography gutterBottom variant="h5" component="div">
          Заглавие на картичката
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
          aliquam eos in? Ipsa vero sint, quae perferendis ipsam est a
          doloremque reprehenderit! Totam dolores exercitationem aliquam.
          Facilis eveniet illum fuga! Adipisci eum, porro quae accusantium qui
          earum sapiente laudantium nesciunt veritatis quod facilis maxime omnis
          inventore? Rerum, quibusdam! Suscipit eius illo odio aliquid debitis
          consequuntur dicta modi nesciunt inventore repudiandae?
        </Typography>
      </Grid>
    </>
  );
};

export default CardComponent;
