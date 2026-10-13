import { ArrowRight, MapPin } from "lucide-react";
import { photos } from "~/assets/images";
import { ArchFrame } from "~/components/ui/ArchFrame";
import { Button } from "~/components/ui/Button";
import { site } from "~/content/site";
import { cx } from "~/lib/cx";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={cx("container", styles.grid)}>
        <div className={styles.copy}>
          <p className="eyebrow">
            {site.address.city} · от {site.since}&nbsp;г.
          </p>
          <h1 id="hero-title" className={styles.title}>
            Време, посветено <em>на вас</em>
          </h1>
          <p className={cx("lead", styles.lead)}>
            Индивидуални възстановяващи сесии на живо и&nbsp;онлайн, тета
            хилинг, Рейки и&nbsp;масажни практики за вашето възстановяване,
            вътрешен баланс и&nbsp;лична промяна.
          </p>
          <div className={styles.actions}>
            <Button
              to="/#kontakti"
              icon={<ArrowRight aria-hidden="true" strokeWidth={1.6} />}
            >
              Запишете час
            </Button>
            <Button to="/uslugi" variant="secondary">
              Разгледайте услугите
            </Button>
          </div>
        </div>

        <figure className={styles.media}>
          <ArchFrame
            photo={photos.sessionRoom}
            priority
            sizes="(min-width: 64rem) 27rem, (min-width: 40rem) 24rem, 84vw"
          />
          <figcaption className={styles.caption}>
            <MapPin aria-hidden="true" strokeWidth={1.6} />
            Студиото в {site.address.city}, {site.address.street}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
