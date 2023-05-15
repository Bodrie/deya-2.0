import React, { useState } from "react";

import {
  ArrowForward,
  AccountCircle,
  PermIdentity,
  Logout,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Avatar,
  useTheme,
  Theme,
  PopoverOrigin,
} from "@mui/material";
import { headerSettings } from "../../constants/constants";
import LinkStyled from "../Link/Link";
import { User } from "firebase/auth";

interface MobileHeaderProps {
  headerPages: Record<string, string>[];
  takeCurrentPage: Record<string, string> | undefined;
  userData: User | null;
  handleOpenUserMenu: (
    event: { target: HTMLElement } | React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  handleCloseUserMenu: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  anchorElUser: Element | ((element: Element) => Element) | null | undefined;
}

const Mobile = ({
  headerPages,
  userData,
  takeCurrentPage,
  handleCloseUserMenu,
  handleOpenUserMenu,
  anchorElUser,
}: MobileHeaderProps) => {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);

  const handleOpenNavMenu = (
    event: { target: HTMLElement } | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorElNav(event.target as HTMLElement);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const {
    hiddenStyle,
    container,
    originBottomLeft,
    originTopRight,
    link,
    menuItem,
    menuBox,
    spacing,
    accIcon,
  } = customization(theme);

  return (
    <>
      <Typography fontSize="1.4rem" color="white" display={hiddenStyle}>
        {takeCurrentPage?.name}
      </Typography>
      <Box sx={container}>
        <IconButton
          disableFocusRipple
          size="large"
          onClick={(e) => handleOpenNavMenu(e)}
          sx={{ paddingLeft: 0 }}
        >
          <MenuIcon sx={{ color: theme.palette.common.white }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={originBottomLeft}
          keepMounted
          transformOrigin={originBottomLeft}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={hiddenStyle}
        >
          {headerPages.map((page) => (
            <LinkStyled
              to={page.href}
              sx={link}
              key={page.name}
              onClick={handleCloseNavMenu}
            >
              <MenuItem sx={menuItem}>
                <Box sx={menuBox}>
                  <ArrowForward sx={spacing} color="primary" />
                  <Typography
                    textAlign="center"
                    color={theme.palette.text.primary}
                  >
                    {page.name}
                  </Typography>
                </Box>
              </MenuItem>
            </LinkStyled>
          ))}
        </Menu>
        {userData && userData.emailVerified && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
              anchorOrigin={originTopRight}
              keepMounted
              transformOrigin={originTopRight}
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
                    <Box sx={menuBox}>
                      {setting.name === "Профил" ? (
                        <PermIdentity sx={spacing} color="primary" />
                      ) : (
                        <Logout sx={spacing} color="primary" />
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
        )}
      </Box>
    </>
  );
};

const customization = (theme: Theme) => {
  return {
    originBottomLeft: {
      vertical: "bottom",
      horizontal: "left",
    } as PopoverOrigin,

    originTopRight: {
      vertical: "top",
      horizontal: "right",
    } as PopoverOrigin,

    hiddenStyle: { xs: "block", md: "none" },

    container: {
      display: { xs: "flex", md: "none" },
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

    menuBox: {
      display: "flex",
      flexGrow: 1,
    },

    spacing: {
      marginRight: "11px",
    },

    accIcon: {
      color: "white",
      width: "25px",
      height: "25px",
    },
  };
};

export default Mobile;
