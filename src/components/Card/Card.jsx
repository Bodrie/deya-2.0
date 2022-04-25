import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

const CardComponent = () => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="./"
          alt="snimka na kartichkata"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Заглавие на картичката
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            aliquam eos in? Ipsa vero sint, quae perferendis ipsam est a
            doloremque reprehenderit! Totam dolores exercitationem aliquam.
            Facilis eveniet illum fuga! Adipisci eum, porro quae accusantium qui
            earum sapiente laudantium nesciunt veritatis quod facilis maxime
            omnis inventore? Rerum, quibusdam! Suscipit eius illo odio aliquid
            debitis consequuntur dicta modi nesciunt inventore repudiandae?
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
