import { photos } from "~/assets/images";
import { LeafBullet } from "~/components/ui/Icons";
import { Picture } from "~/components/ui/Picture";
import { Reveal } from "~/components/ui/Reveal";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { massage, serviceById } from "~/content/services";
import { cx } from "~/lib/cx";
import styles from "./MassageSection.module.css";

export function MassageSection() {
  const service = serviceById.massage;

  return (
    <section
      id={service.anchor}
      className={styles.section}
      aria-labelledby="massage-title"
    >
      <div className={cx("container", styles.grid)}>
        <Reveal className={styles.copy}>
          <SectionHeading
            id="massage-title"
            eyebrow={massage.kicker}
            title={service.title}
          />
          <div className={styles.practices}>
            <h3 className={styles.listTitle}>{massage.listTitle}</h3>
            <ul role="list" className={styles.list}>
              {massage.practices.map((practice) => (
                <li key={practice.name} className={styles.item}>
                  <LeafBullet className={styles.leaf} />
                  <span className={styles.practice}>
                    <span className={styles.name}>{practice.name}</span>
                    {practice.signature && (
                      <span className={styles.badge}>
                        {massage.signatureLabel}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className={styles.closing}>{massage.closing}</p>
        </Reveal>

        <Reveal as="figure" className={styles.media} delay={120}>
          <Picture
            photo={photos.massageRoom}
            sizes="(min-width: 64rem) 34rem, 92vw"
            focus="55% 60%"
            className={styles.picture}
          />
          <figcaption className={styles.caption}>
            Масажната зала в студиото
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
