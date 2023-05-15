import React, { useState } from "react";
import { AccountCircle, PermIdentity, Logout } from "@mui/icons-material";
import {
  Box,
  Tabs,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Divider,
  Theme,
  PopoverOrigin,
} from "@mui/material";
import { TabLinkStyled } from "..";
import { headerSettings } from "../../constants/constants";
import LinkStyled from "../Link/Link";
import { User } from "firebase/auth";

interface DesktopHeaderProps {
  headerPages: Record<string, string>[];
  takeCurrentPage: Record<string, string> | undefined;
  userData: User | null;
  handleOpenUserMenu: (
    event: { target: HTMLElement } | React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  handleCloseUserMenu: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  anchorElUser: Element | ((element: Element) => Element) | null;
}

const Desktop = ({
  headerPages,
  userData,
  anchorElUser,
  handleCloseUserMenu,
  handleOpenUserMenu,
  takeCurrentPage,
}: DesktopHeaderProps) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabValue: number
  ) => {
    setActiveTab(newTabValue);
  };
  const pageInNavigation = typeof takeCurrentPage !== "undefined";
  const {
    container,
    boxContainer,
    divider,
    accIcon,
    btnIcon,
    iconSpacing,
    link,
    menuItem,
    menuItemBox,
    anchorOrigin,
    tabIndicatorProps,
  } = customization(theme, pageInNavigation);

  return (
    <>
      <Box sx={container}>
        <Tabs
          TabIndicatorProps={tabIndicatorProps}
          value={activeTab}
          onChange={handleTabChange}
        >
          {headerPages.map((page, index) => (
            <TabLinkStyled
              value={index}
              to={page.href}
              label={page.name}
              key={`${page.href}-${index}`}
            />
          ))}
        </Tabs>

        {userData && userData.emailVerified && (
          <>
            <Divider orientation="vertical" flexItem sx={divider} />
            <Typography color={"white"}>
              Здравей,{" "}
              {userData.displayName ? userData.displayName : userData.email}!
            </Typography>
            <Box sx={boxContainer}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={btnIcon}>
                  {userData.photoURL ? (
                    <Avatar alt="user photo" src={userData.photoURL} />
                  ) : (
                    <AccountCircle sx={accIcon} />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={anchorOrigin}
                keepMounted
                transformOrigin={anchorOrigin}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {headerSettings.map((setting) => (
                  <LinkStyled
                    to={setting.href}
                    key={setting.href}
                    sx={link}
                    onClick={handleCloseUserMenu}
                  >
                    <MenuItem sx={menuItem}>
                      <Box sx={menuItemBox}>
                        {setting.name === "Профил" ? (
                          <PermIdentity sx={iconSpacing} color="primary" />
                        ) : (
                          <Logout sx={iconSpacing} color="primary" />
                        )}
                        <Typography
                          textAlign="center"
                          color={theme.palette.text.primary}
                        >
                          {setting.name}
                        </Typography>
                      </Box>
                    </MenuItem>
                  </LinkStyled>
                ))}
              </Menu>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

const customization = (theme: Theme, pageInNavigation: boolean) => {
  return {
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    } as PopoverOrigin,

    transformOrigin: {
      vertical: "top",
      horizontal: "right",
    },

    tabIndicatorProps: {
      style: {
        backgroundColor: pageInNavigation ? "white" : "transparent",
      },
    },

    container: {
      display: { md: "flex" },
      position: { xs: "absolute", md: "inherit" },
      visibility: { xs: "hidden", md: "visible" },
      justifyContent: "space-evenly",
      alignItems: "center",
    },

    boxContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },

    link: {
      width: "12rem",
      padding: "0px",
      ":hover": {
        backgroundColor: theme.palette.grey[200],
      },
    },

    menuItem: {
      transition: "600ms",
      flexGrow: 1,
      padding: "0.5rem 1.2rem",
      ":hover": {
        marginLeft: "15px",
        transition: "600ms",
        backgroundColor: "unset",
      },
    },

    menuItemBox: {
      display: "flex",
      flexGrow: 1,
    },

    divider: {
      backgroundColor: theme.palette.primary.contrastText,
      margin: "0 1rem 0 1rem",
    },

    accIcon: {
      color: "white",
      width: "50px",
      height: "50px",
    },

    btnIcon: { p: 0, marginLeft: "1rem" },

    iconSpacing: { marginRight: "11px" },
  };
};

export default Desktop;
