import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material";

const LinkStyled = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  WebkitTapHighlightColor: "unset",
}));

export default LinkStyled;
