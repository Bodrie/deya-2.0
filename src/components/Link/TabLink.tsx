import React from "react";
import { Tab } from "@mui/material";
import LinkStyled from "./Link";

interface LinkTabProps {
  label: string;
  to: string;
  value: number;
}

const LinkTab = (props: LinkTabProps) => {
  return (
    <Tab
      component={LinkStyled}
      disableRipple
      sx={{ color: "white", "&.Mui-selected": { color: "white" } }}
      {...props}
    />
  );
};

export default LinkTab;
