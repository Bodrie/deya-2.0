import { Emblem } from "~/components/brand/Logo";
import { Reveal } from "~/components/ui/Reveal";
import { signatureQuote } from "~/content/about";
import { site } from "~/content/site";
import { cx } from "~/lib/cx";
import styles from "./QuoteBand.module.css";

export function QuoteBand() {
  return (
    <section className={styles.band} aria-label="Мисъл от Емилия Стефанова">
      <Reveal className={cx("container", styles.inner)}>
        <Emblem tone="dark" className={styles.emblem} />
        <figure className={styles.figure}>
          <blockquote className={styles.quote}>
            <p className={styles.lead}>{signatureQuote.lead}</p>
            <p className={styles.text}>{signatureQuote.text}</p>
          </blockquote>
          <figcaption className={styles.caption}>{site.person}</figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
