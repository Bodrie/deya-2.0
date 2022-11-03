import React, { ReactElement } from "react";
import { Slide, useScrollTrigger } from "@mui/material";

interface IHideOnScroll {
  children: ReactElement<any, any>;
  window?: any;
}

const HideOnScroll = ({ children, window }: IHideOnScroll) => {
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
