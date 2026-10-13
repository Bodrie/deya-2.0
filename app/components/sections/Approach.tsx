import { Info } from "lucide-react";
import type { Photo } from "~/assets/images";
import { Picture } from "~/components/ui/Picture";
import { Reveal } from "~/components/ui/Reveal";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { approach } from "~/content/services";
import { disclaimer } from "~/content/site";
import { cx } from "~/lib/cx";
import styles from "./Approach.module.css";

interface ApproachProps {
  photo: Photo;
  caption: string;
}

/** How sessions are shaped, the methods combined, and the medical disclaimer. */
export function Approach({ photo, caption }: ApproachProps) {
  return (
    <section className={styles.section} aria-labelledby="approach-title">
      <div className={cx("container", styles.grid)}>
        <Reveal className={styles.copy}>
          <SectionHeading
            id="approach-title"
            eyebrow="Подход"
            title={approach.title}
            lead={<p>{approach.body}</p>}
          />

          <div className={styles.methods}>
            <p className={styles.methodsTitle}>{approach.methodsTitle}</p>
            <ul role="list" className={styles.chips}>
              {approach.methods.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
          </div>

          <p className={styles.note}>
            <Info aria-hidden="true" strokeWidth={1.6} />
            <span>{disclaimer}</span>
          </p>
        </Reveal>

        <Reveal as="figure" className={styles.media} delay={120}>
          <Picture
            photo={photo}
            sizes="(min-width: 64rem) 36rem, 92vw"
            className={styles.picture}
          />
          <figcaption className={styles.caption}>{caption}</figcaption>
        </Reveal>
      </div>
    </section>
  );
}
