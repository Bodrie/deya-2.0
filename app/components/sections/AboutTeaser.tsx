import { ArrowRight } from "lucide-react";
import { photos } from "~/assets/images";
import { Button } from "~/components/ui/Button";
import { LeafList } from "~/components/ui/LeafList";
import { Picture } from "~/components/ui/Picture";
import { Reveal } from "~/components/ui/Reveal";
import { bio, soulQuote } from "~/content/about";
import { site } from "~/content/site";
import { cx } from "~/lib/cx";
import styles from "./AboutTeaser.module.css";

export function AboutTeaser() {
  return (
    <section className={styles.section} aria-labelledby="about-title">
      <div className={cx("container", styles.grid)}>
        <Reveal className={styles.copy}>
          <p className="eyebrow">За мен</p>
          <h2 id="about-title" className={styles.title}>
            {site.person}
          </h2>
          <LeafList
            items={[...site.roles]}
            columns={2}
            className={styles.roles}
          />
          <p className={styles.text}>{bio.paragraphs[0]}</p>
          <blockquote className={styles.quote}>
            <p>{soulQuote}</p>
          </blockquote>
          <Button
            to="/za-men"
            variant="secondary"
            icon={<ArrowRight aria-hidden="true" strokeWidth={1.6} />}
          >
            Повече за мен
          </Button>
        </Reveal>

        <Reveal className={styles.media} delay={120}>
          <Picture
            photo={photos.lounge}
            sizes="(min-width: 64rem) 34rem, 92vw"
            focus="62% 50%"
            className={styles.picture}
          />
        </Reveal>
      </div>
    </section>
  );
}
