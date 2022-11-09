import React from "react";
import { Tab } from "@mui/material";
import LinkStyled from "./Link";

interface LinkTabProps {
  label?: string;
  href: string;
}

const LinkTab = (props: LinkTabProps) => {
  console.log(props);

  return (
    <>
      <LinkStyled to={props.href}>
        <Tab
          disableRipple
          sx={{ color: "white", "&.Mui-selected": { color: "white" } }}
          {...props}
        />
      </LinkStyled>
    </>
  );
};

export default LinkTab;
