import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Container, CardMedia } from "@mui/material";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import { LinkStyled } from "..";
import logo from "../../assets/images/logo/logo.png";
import { getAuth, signOut, User } from "firebase/auth";
import { FirestoreError } from "firebase/firestore";

interface IHeaderProps {
  userData: User | null;
}

const Header = ({ userData }: IHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const headerPages = [
    { name: "Начало", href: "/" },
    {
      name: userData?.emailVerified ? "Календар" : "Вход",
      href: userData?.emailVerified ? "/calendar" : "/login",
    },
  ];

  const takeCurrentPage = headerPages.find(
    (page) => page.href === location.pathname
  );

  const handleOpenUserMenu = (
    event: { target: HTMLElement } | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorElUser(event.target as HTMLElement);
  };

  const handleCloseUserMenu = (
    event: { target: HTMLElement } | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const target = event.target as HTMLElement;
    if (target.textContent === "Излез") {
      const auth = getAuth();
      signOut(auth)
        .then(() => navigate("/"))
        .catch((error: FirestoreError) => {
          throw new Error(`${error.name}: ${error.message}`);
        });
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={styles.toolBar}>
          <LinkStyled to={"/"}>
            {/* <CardMedia image={logo} sx={styles.cardMedia} /> */}
          </LinkStyled>
          <Desktop
            headerPages={headerPages}
            takeCurrentPage={takeCurrentPage}
            userData={userData}
            anchorElUser={anchorElUser}
            handleCloseUserMenu={handleCloseUserMenu}
            handleOpenUserMenu={handleOpenUserMenu}
          />
          <Mobile
            headerPages={headerPages}
            takeCurrentPage={takeCurrentPage}
            userData={userData}
            anchorElUser={anchorElUser}
            handleCloseUserMenu={handleCloseUserMenu}
            handleOpenUserMenu={handleOpenUserMenu}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const styles = {
  appBar: { zIndex: 2 },
  toolBar: { justifyContent: "space-between" },
  cardMedia: { height: 90, width: 90 },
};
export default Header;
