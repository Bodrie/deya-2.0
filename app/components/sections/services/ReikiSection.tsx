import { LeafList } from "~/components/ui/LeafList";
import { Reveal } from "~/components/ui/Reveal";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { reikiTraining, serviceById } from "~/content/services";
import { cx } from "~/lib/cx";
import styles from "./ReikiSection.module.css";

/** Reiki training. The three degrees are a real sequence, so they are drawn as rising arches. */
export function ReikiSection() {
  const service = serviceById.reiki;

  return (
    <section
      id={service.anchor}
      className={styles.section}
      aria-labelledby="reiki-title"
    >
      <div className={cx("container", styles.grid)}>
        <Reveal className={styles.copy}>
          <SectionHeading
            id="reiki-title"
            eyebrow={reikiTraining.kicker}
            title={service.title}
            lead={reikiTraining.body.map((text) => (
              <p key={text}>{text}</p>
            ))}
          />
          <div className={styles.audience}>
            <h3 className={styles.audienceTitle}>
              {reikiTraining.audienceTitle}
            </h3>
            <LeafList items={reikiTraining.audience} />
          </div>
        </Reveal>

        <Reveal className={styles.levels} delay={120}>
          <ol className={styles.steps} aria-label="Степени на обучението">
            {reikiTraining.levels.map((level, i) => (
              <li
                key={level.numeral}
                className={styles.step}
                data-level={i + 1}
              >
                <span className={styles.numeral}>{level.numeral}</span>
                <span className={styles.stepLabel}>{level.label}</span>
              </li>
            ))}
          </ol>
          <p className={styles.levelsNote}>Рейки – Двуканална система</p>
        </Reveal>
      </div>
    </section>
  );
}
