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
} from "@mui/material";
import { headerSettings } from "../../constants/constants";
import LinkStyled from "../Link/Link";
import { User } from "firebase/auth";

interface MobileHeaderProps {
  headerPages: Record<string, string>[];
  takeCurrentPage: Record<string, string> | undefined;
  userData: User | null;
  handleOpenUserMenu: any;
  handleCloseUserMenu: any;
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
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorElNav(
      event.currentTarget as unknown as React.SetStateAction<null>
    );
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Typography
        fontSize={"1.4rem"}
        color="white"
        display={{ xs: "block", md: "none" }}
      >
        {takeCurrentPage?.name}
      </Typography>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "flex-end",
        }}
      >
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
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {headerPages.map((page) => (
            <LinkStyled
              to={page.href}
              sx={{
                width: "12rem",
                padding: "0px",
                ":hover": {
                  backgroundColor: theme.palette.grey[200],
                },
              }}
              key={page.name}
              onClick={handleCloseNavMenu}
            >
              <MenuItem
                sx={{
                  transition: "600ms",
                  flexGrow: 1,
                  padding: "0.5rem 1.2rem",
                  ":hover": {
                    marginLeft: "15px",
                    transition: "600ms",
                    backgroundColor: "unset",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                  }}
                >
                  <ArrowForward sx={{ marginRight: "11px" }} color="primary" />
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
                  <AccountCircle
                    sx={{
                      color: "white",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {headerSettings.map((setting) => (
                <LinkStyled
                  to={setting.href}
                  key={setting.href}
                  sx={{
                    width: "12rem",
                    padding: "0px",
                    ":hover": {
                      backgroundColor: theme.palette.grey[200],
                    },
                  }}
                  onClick={handleCloseUserMenu}
                >
                  <MenuItem
                    sx={{
                      transition: "600ms",
                      flexGrow: 1,
                      padding: "0.5rem 1.2rem",
                      ":hover": {
                        marginLeft: "15px",
                        transition: "600ms",
                        backgroundColor: "unset",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexGrow: 1,
                      }}
                    >
                      {setting.name === "Профил" ? (
                        <PermIdentity
                          sx={{ marginRight: "11px" }}
                          color="primary"
                        />
                      ) : (
                        <Logout sx={{ marginRight: "11px" }} color="primary" />
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

export default Mobile;
