import { Link } from "react-router";
import { LogoStacked } from "~/components/brand/Logo";
import { IconFacebook } from "~/components/ui/Icons";
import { disclaimer, mapsLink, navigation, site } from "~/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <LogoStacked tone="dark" className={styles.logo} />
            <p className={styles.tagline}>Време, посветено на вас.</p>
          </div>

          <nav aria-label="Страници" className={styles.column}>
            <h2 className={styles.columnTitle}>Страници</h2>
            <ul role="list" className={styles.list}>
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Контакти</h2>
            <ul role="list" className={styles.list}>
              <li>
                <a href={site.phone.href} className={styles.link}>
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={styles.link}>
                  {site.email}
                </a>
              </li>
              <li>
                <address className={styles.address}>
                  гр.&nbsp;{site.address.city}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.unit}
                </address>
                <a
                  href={mapsLink}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Упътване в Google Maps
                  <span className="visually-hidden">
                    {" "}
                    (отваря се в нов прозорец)
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Последвайте</h2>
            <a
              href={site.facebook}
              className={styles.social}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconFacebook />
              <span>
                Енергийни терапии ДЕЯ
                <span className="visually-hidden">
                  {" "}
                  във Facebook (отваря се в нов прозорец)
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.disclaimer}>{disclaimer}</p>
          <p suppressHydrationWarning>
            © {year} {site.brandFull} · {site.person}
          </p>
        </div>
      </div>
    </footer>
  );
}
