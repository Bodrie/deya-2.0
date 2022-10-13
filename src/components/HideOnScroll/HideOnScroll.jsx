import React from "react";
import { Slide, useScrollTrigger } from "@mui/material";

const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger} timeout={400}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
