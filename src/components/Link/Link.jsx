import { NavLink } from "react-router-dom";
import { styled } from "@mui/material";

const LinkStyled = styled(NavLink)(({ theme }) => ({
  display: "inherit",
  color: "inherit",
  textDecoration: "none",
  WebkitTapHighlightColor: "unset",
}));

export default LinkStyled;
