import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Reveal } from "~/components/ui/Reveal";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { mapsLink, site } from "~/content/site";
import { cx } from "~/lib/cx";
import styles from "./ContactSection.module.css";
import { MapEmbed } from "./MapEmbed";

export function ContactSection() {
  return (
    <section
      id="kontakti"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <div className={cx("container", styles.grid)}>
        <Reveal className={styles.copy}>
          <SectionHeading
            id="contact-title"
            eyebrow="Контакти"
            title="Запишете час"
            lead={
              <p>
                Свържете се с&nbsp;мен по телефона или по имейл, за да уговорим
                удобен ден и&nbsp;час за вашата сесия.
              </p>
            }
          />

          <dl className={styles.details}>
            <div className={styles.row}>
              <dt>
                <Phone aria-hidden="true" strokeWidth={1.6} />
                Телефон
              </dt>
              <dd>
                <a href={site.phone.href} className={styles.phone}>
                  {site.phone.display}
                </a>
              </dd>
            </div>
            <div className={styles.row}>
              <dt>
                <Mail aria-hidden="true" strokeWidth={1.6} />
                Имейл
              </dt>
              <dd>
                <a href={`mailto:${site.email}`} className={styles.link}>
                  {site.email}
                </a>
              </dd>
            </div>
            <div className={styles.row}>
              <dt>
                <MapPin aria-hidden="true" strokeWidth={1.6} />
                Адрес
              </dt>
              <dd>
                <address className={styles.address}>
                  гр.&nbsp;{site.address.city}, {site.address.street}
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
              </dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <Button
              to={site.phone.href}
              icon={<Phone aria-hidden="true" strokeWidth={1.6} />}
              iconPosition="start"
            >
              Обадете се
            </Button>
            <Button
              to={`mailto:${site.email}`}
              variant="secondary"
              icon={<Mail aria-hidden="true" strokeWidth={1.6} />}
              iconPosition="start"
            >
              Изпратете имейл
            </Button>
          </div>
        </Reveal>

        <Reveal className={styles.mapWrap} delay={120}>
          <MapEmbed />
        </Reveal>
      </div>
    </section>
  );
}
