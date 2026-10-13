import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { LogoLockup } from "~/components/brand/Logo";
import { navigation, site } from "~/content/site";
import { cx } from "~/lib/cx";
import styles from "./Header.module.css";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

const isScrolled = () => window.scrollY > 8;
const isScrolledOnServer = () => false;

/** Hash links ("/#kontakti") point into a page, so they never show as the current page. */
const isHashLink = (to: string) => to.includes("#");

export function Header() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    isScrolled,
    isScrolledOnServer,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();

  // Close the mobile menu whenever the route or hash changes.
  useEffect(() => {
    dialogRef.current?.close();
  }, [location.pathname, location.hash]);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  return (
    <header className={styles.header} data-scrolled={scrolled ? "" : undefined}>
      <div className={cx("container", styles.inner)}>
        <Link
          to="/"
          className={styles.brand}
          aria-label="ДЕЯ, енергийни терапии – начало"
        >
          <LogoLockup />
        </Link>

        <nav aria-label="Основна навигация" className={styles.nav}>
          <ul role="list" className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.to}>
                {isHashLink(item.to) ? (
                  <Link to={item.to} className={styles.navLink}>
                    {item.label}
                  </Link>
                ) : (
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={styles.navLink}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={site.phone.href} className={styles.phone}>
            <Phone aria-hidden="true" strokeWidth={1.6} />
            <span className={styles.phoneNumber}>{site.phone.display}</span>
            <span className="visually-hidden"> – обадете се</span>
          </a>
          <button
            type="button"
            className={cx(styles.iconButton, styles.menuToggle)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={openMenu}
          >
            <Menu aria-hidden="true" strokeWidth={1.6} />
            <span className="visually-hidden">Отвори менюто</span>
          </button>
        </div>
      </div>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        className={styles.menu}
        aria-label="Меню"
        onClose={() => setMenuOpen(false)}
      >
        <div className={styles.menuTop}>
          <LogoLockup />
          <button
            type="button"
            className={styles.iconButton}
            onClick={closeMenu}
          >
            <X aria-hidden="true" strokeWidth={1.6} />
            <span className="visually-hidden">Затвори менюто</span>
          </button>
        </div>

        <nav aria-label="Навигация в менюто" className={styles.menuNav}>
          <ul role="list" className={styles.menuList}>
            {navigation.map((item) => (
              <li key={item.to}>
                {isHashLink(item.to) ? (
                  <Link
                    to={item.to}
                    className={styles.menuLink}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={styles.menuLink}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.menuContact}>
          <a href={site.phone.href} className={styles.menuContactRow}>
            <Phone aria-hidden="true" strokeWidth={1.6} />
            {site.phone.display}
          </a>
          <a href={`mailto:${site.email}`} className={styles.menuContactRow}>
            <Mail aria-hidden="true" strokeWidth={1.6} />
            {site.email}
          </a>
          <p className={styles.menuContactRow}>
            <MapPin aria-hidden="true" strokeWidth={1.6} />
            <span>
              гр.&nbsp;{site.address.city}, {site.address.street},{" "}
              {site.address.unit}
            </span>
          </p>
        </div>
      </dialog>
    </header>
  );
}
