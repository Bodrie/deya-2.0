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
} from "@mui/material";
import { TabLinkStyled } from "..";
import { headerSettings } from "../../constants/constants";
import LinkStyled from "../Link/Link";
import { User } from "firebase/auth";

interface DesktopHeaderProps {
  headerPages: Record<string, string>[];
  takeCurrentPage: Record<string, string> | undefined;
  userData: User | null;
  handleOpenUserMenu: any;
  handleCloseUserMenu: any;
  anchorElUser: Element | ((element: Element) => Element) | null | undefined;
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

  return (
    <>
      <Box
        sx={{
          display: { md: "flex" },
          position: { xs: "absolute", md: "inherit" },
          visibility: { xs: "hidden", md: "visible" },
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Tabs
          TabIndicatorProps={{
            style: {
              backgroundColor: pageInNavigation ? "white" : "transparent",
            },
          }}
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
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: theme.palette.primary.contrastText,
                margin: "0 1rem 0 1rem",
              }}
            />
            <Typography color={"white"}>
              Здравей,{" "}
              {userData.displayName ? userData.displayName : userData.email}!
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, marginLeft: "1rem" }}
                >
                  {userData.photoURL ? (
                    <Avatar alt="user photo" src={userData.photoURL} />
                  ) : (
                    <AccountCircle
                      sx={{
                        color: "white",
                        width: "50px",
                        height: "50px",
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

export default Desktop;
