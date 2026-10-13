import { ArrowUpRight, MapPin } from "lucide-react";
import { useState } from "react";
import { mapsEmbed, mapsLink, site } from "~/content/site";
import styles from "./MapEmbed.module.css";

/**
 * Google Maps loads only when the visitor asks for it, which keeps the page
 * fast and avoids third-party cookies until then.
 */
export function MapEmbed() {
  const [active, setActive] = useState(false);
  const label = `${site.address.street}, ${site.address.city}`;

  if (active) {
    return (
      <div className={styles.map}>
        <iframe
          className={styles.frame}
          title={`Карта: студио ДЕЯ, ${label}`}
          src={mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={styles.map}>
      <svg
        className={styles.streets}
        viewBox="0 0 480 360"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="#e4dbe3">
          <rect x="18" y="18" width="104" height="66" rx="10" />
          <rect x="352" y="26" width="110" height="74" rx="10" />
          <rect x="24" y="262" width="112" height="76" rx="10" />
          <rect x="346" y="252" width="116" height="86" rx="10" />
        </g>
        <g fill="none" stroke="#fff" strokeLinecap="round">
          <path d="M-20 212C120 192 330 206 500 182" strokeWidth="14" />
          <path d="M-20 112C140 126 320 100 500 122" strokeWidth="8" />
          <path d="M150 -20C160 120 140 250 158 380" strokeWidth="7" />
          <path d="M330 -20C320 110 345 240 325 380" strokeWidth="7" />
          <path d="M-20 300C120 290 250 312 500 292" strokeWidth="4" />
        </g>
      </svg>

      <div className={styles.card}>
        <span className={styles.pin}>
          <MapPin aria-hidden="true" strokeWidth={1.6} />
        </span>
        <p className={styles.place}>
          Студио ДЕЯ
          <span>
            {label}, {site.address.unit}
          </span>
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.show}
            onClick={() => setActive(true)}
          >
            Покажи картата
          </button>
          <a
            href={mapsLink}
            className={styles.external}
            target="_blank"
            rel="noopener noreferrer"
          >
            Упътване
            <ArrowUpRight aria-hidden="true" strokeWidth={1.6} />
            <span className="visually-hidden">
              {" "}
              в Google Maps (отваря се в нов прозорец)
            </span>
          </a>
        </div>
        <p className={styles.privacy}>
          Картата се зарежда от Google Maps след натискане на бутона.
        </p>
      </div>
    </div>
  );
}
