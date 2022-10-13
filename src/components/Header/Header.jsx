/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  MenuItem,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  CardMedia,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, ArrowForward } from "@mui/icons-material";
import { LinkStyled, HideOnScroll } from "../../components";
import logo from "../../assets/images/logo/logo.png";
import { headerSettings } from "../../constants/constants";
import { getAuth, signOut } from "firebase/auth";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const headerPages = [
    { name: "Рейки", href: "/reiki" },
    { name: "Тета", href: "/teta" },
    { name: "За мен", href: "/about" },
    { name: "Контакти", href: "/contacts" },
    { name: user ? "Календар" : "Вход", href: user ? "/calendar" : "/login" },
  ];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    if (event.target.innerHTML === "Profile") {
      navigate("/profile");
    }
    if (event.target.innerHTML === "Logout") {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          navigate("/");
          console.log(
            "successful signout, put some pop up idiot, dont forget it..."
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setAnchorElUser(null);
  };

  const theme = useTheme();

  return (
    <HideOnScroll>
      <AppBar position="sticky" sx={{ zIndex: 2 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 0.7,
                mr: 2,
                mb: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              <LinkStyled to={"/home"}>
                {/* image={logo} */}
                <CardMedia
                  sx={{ height: 90, width: 90, backgroundColor: "red" }}
                />
              </LinkStyled>
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, mb: 1 }}
            >
              <LinkStyled to={"/home"}>
                {/* image={logo} */}
                <CardMedia
                  sx={{ height: 90, width: 90, backgroundColor: "red" }}
                />
              </LinkStyled>
            </Typography>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton size="large" onClick={handleOpenNavMenu}>
                <MenuIcon sx={{ color: theme.palette.text.secondary }} />
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
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ width: "12rem", padding: "0px" }}
                  >
                    <LinkStyled
                      to={page.href}
                      sx={{ flexGrow: 1, padding: "0.5rem 1.2rem" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          transition: "600ms",
                          flexGrow: 1,
                          ":hover": {
                            marginLeft: "15px",
                            transition: "600ms",
                          },
                        }}
                      >
                        <ArrowForward
                          sx={{ marginRight: "11px" }}
                          color="primary"
                        />
                        <Typography
                          textAlign="center"
                          color={theme.palette.text.primary}
                        >
                          {page.name}
                        </Typography>
                      </Box>
                    </LinkStyled>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                flexGrow: 0.3,
                display: { xs: "none", md: "flex" },
                justifyContent: "space-evenly",
              }}
            >
              {headerPages.map((page) => (
                <LinkStyled to={page.href} key={page.name}>
                  <Button
                    onClick={handleCloseNavMenu}
                    variant="outlined"
                    color="primary"
                    size="large"
                  >
                    {page.name}
                  </Button>
                </LinkStyled>
              ))}
            </Box>

            {/* If we add user manegmant in the future */}
            {user && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="user photo" src={user.photoURL} />
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
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                      sx={{ padding: "0px" }}
                    >
                      <Typography
                        textAlign="center"
                        color={theme.palette.text.primary}
                        sx={{ padding: "0.5rem 1.2rem" }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};
export default Header;
