import { Reveal } from "~/components/ui/Reveal";
import { site } from "~/content/site";
import styles from "./Statement.module.css";

/** Emilia's promise of the space, in her words, set large. */
export function Statement() {
  return (
    <section className={styles.section} aria-label="Пространството">
      <div className="container">
        <div className={styles.grid}>
          <span className={styles.mark} aria-hidden="true">
            „
          </span>
          <Reveal className={styles.body}>
            <p className={styles.text}>
              Създавам <em>спокойно, сигурно и&nbsp;подкрепящо</em>{" "}
              пространство, в&nbsp;което можете да се отпуснете, да бъдете чути
              и&nbsp;да насочите внимание към собствените си потребности.
            </p>
            <p className={styles.signature}>
              <span className={styles.name}>{site.person}</span>
              <span className={styles.role}>
                енергиен терапевт, Рейки учител и&nbsp;масажист
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
