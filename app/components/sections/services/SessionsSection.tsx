import { MapPin } from "lucide-react";
import { photos } from "~/assets/images";
import { IconOnline } from "~/components/ui/Icons";
import { LeafList } from "~/components/ui/LeafList";
import { Picture } from "~/components/ui/Picture";
import { Reveal } from "~/components/ui/Reveal";
import { SectionHeading } from "~/components/ui/SectionHeading";
import {
  formats,
  serviceById,
  sessions,
  thetaHealing,
} from "~/content/services";
import { site } from "~/content/site";
import styles from "./SessionsSection.module.css";

/**
 * Individual restorative sessions. The method is the same online and in the
 * studio, so both formats share one introduction.
 */
export function SessionsSection() {
  const online = serviceById.online;
  const live = serviceById.live;

  return (
    <section className={styles.section} aria-labelledby="sessions-title">
      <div className="container">
        <div className={styles.intro}>
          <Reveal className={styles.introCopy}>
            <SectionHeading
              id="sessions-title"
              eyebrow="Сесии"
              title={sessions.title}
              lead={sessions.intro.map((text) => (
                <p key={text}>{text}</p>
              ))}
            />
            <p className={styles.closing}>{sessions.closing}</p>
          </Reveal>

          <Reveal className={styles.focus} delay={120}>
            <h3 className={styles.focusTitle}>{sessions.focusTitle}</h3>
            <LeafList items={sessions.focus} />
          </Reveal>
        </div>

        <div className={styles.formats}>
          <Reveal
            as="article"
            id={online.anchor}
            className={styles.format}
            aria-labelledby="online-title"
          >
            <div className={styles.visual} data-kind="online">
              <IconOnline className={styles.visualIcon} />
            </div>
            <div className={styles.formatBody}>
              <p className="eyebrow">{formats.online.kicker}</p>
              <h3 id="online-title" className={styles.formatTitle}>
                {online.title}
              </h3>
              {formats.online.body.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </Reveal>

          <Reveal
            as="article"
            id={live.anchor}
            className={styles.format}
            delay={120}
            aria-labelledby="live-title"
          >
            <div className={styles.visual}>
              <Picture
                photo={photos.sessionRoom}
                sizes="(min-width: 64rem) 36rem, 92vw"
                focus="50% 58%"
                className={styles.picture}
              />
            </div>
            <div className={styles.formatBody}>
              <p className="eyebrow">{formats.live.kicker}</p>
              <h3 id="live-title" className={styles.formatTitle}>
                {live.title}
              </h3>
              {formats.live.body.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <p className={styles.address}>
                <MapPin aria-hidden="true" strokeWidth={1.6} />
                гр.&nbsp;{site.address.city}, {site.address.street},{" "}
                {site.address.unit}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className={styles.theta}>
          <span className={styles.thetaGlyph} aria-hidden="true">
            θ
          </span>
          <div className={styles.thetaBody}>
            <h3 className={styles.thetaTitle}>{thetaHealing.title}</h3>
            {thetaHealing.body.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
