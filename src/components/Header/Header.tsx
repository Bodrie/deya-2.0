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
  Tooltip,
  CardMedia,
  useTheme,
  Tabs,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ArrowForward,
  PermIdentity,
  Logout,
  AccountCircle,
} from "@mui/icons-material";
import { LinkStyled, HideOnScroll, TabLinkStyled } from "..";
import logo from "../../assets/images/logo/logo.png";
import { headerSettings } from "../../constants/constants";
import { getAuth, signOut, User } from "firebase/auth";
import { FirestoreError } from "firebase/firestore";

interface IHeaderProps {
  userData: User | null;
}

const Header = ({ userData }: IHeaderProps) => {
  const navigate = useNavigate();
  const headerPages = [
    { name: "Начало", href: "/" },
    { name: "Рейки", href: "/reiki" },
    { name: "Тета", href: "/teta" },
    { name: "За мен", href: "/about" },
    { name: "Контакти", href: "/contacts" },
    {
      name: userData?.uid ? "Календар" : "Вход",
      href: userData?.uid ? "/calendar" : "/login",
    },
  ];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabValue: number
  ) => {
    setActiveTab(newTabValue);
  };

  const handleOpenNavMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorElNav(
      event.currentTarget as unknown as React.SetStateAction<null>
    );
  };
  const handleOpenUserMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorElUser(
      event.currentTarget as unknown as React.SetStateAction<null>
    );
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event: any) => {
    if (event.target.innerHTML === "Излез") {
      const auth = getAuth();
      signOut(auth)
        .then(() => navigate("/"))
        .catch((error: FirestoreError) => {
          throw new Error(`${error.name}: ${error.message}`);
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
              <LinkStyled to={"/login"}>
                <CardMedia image={logo} sx={{ height: 90, width: 90 }} />
              </LinkStyled>
              <div id="where-am-i"></div>
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, mb: 1 }}
            >
              <LinkStyled to={"/login"}>
                <CardMedia image={logo} sx={{ height: 90, width: 90 }} />
              </LinkStyled>
              <div id="where-am-i"></div>
            </Typography>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton size="large" onClick={(e) => handleOpenNavMenu(e)}>
                <MenuIcon sx={{ color: theme.palette.primary.contrastText }} />
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
                  >
                    <MenuItem
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      sx={{
                        transition: "600ms",
                        flexGrow: 1,
                        padding: "0.5rem 1.2rem",
                        ":hover": {
                          marginLeft: "15px",
                          transition: "600ms",
                          backgroundColor: 'none'
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexGrow: 1,
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
                    </MenuItem>
                  </LinkStyled>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                display: { md: "flex" },
                visibility: { xs: "hidden", md: "visible" },
                width: { xs: "0px", md: "inherit" },
                height: { xs: "0px", md: "inherit" },
                justifyContent: "space-evenly",
              }}
            >
              <Tabs
                TabIndicatorProps={{ style: { backgroundColor: "white" } }}
                value={activeTab}
                onChange={handleTabChange}
              >
                {headerPages.map((page, index) => (
                  <TabLinkStyled
                    value={index}
                    to={page.href}
                    label={page.name}
                    key={page.href}
                  />
                ))}
              </Tabs>
            </Box>

            {/* If we add user manegmant in the future */}
            {userData && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userData.photoURL ? (
                      <Avatar alt="user photo" src={userData.photoURL} />
                    ) : (
                      <AccountCircle />
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
                    <MenuItem
                      key={setting.name}
                      onClick={handleCloseUserMenu}
                      sx={{ width: "12rem", padding: "0px" }}
                    >
                      <LinkStyled
                        to={setting.href}
                        sx={{
                          transition: "600ms",
                          flexGrow: 1,
                          padding: "0.5rem 1.2rem",
                          ":hover": {
                            marginLeft: "15px",
                            transition: "600ms",
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
                            <Logout
                              sx={{ marginRight: "11px" }}
                              color="primary"
                            />
                          )}
                          <Typography
                            textAlign="center"
                            color={theme.palette.text.primary}
                          >
                            {setting.name}
                          </Typography>
                        </Box>
                      </LinkStyled>
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
